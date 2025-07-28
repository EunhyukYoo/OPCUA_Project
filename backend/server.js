const express = require('express');
const { OPCUAClient, AttributeIds } = require('node-opcua');

const app = express();
app.use(express.json());

const endpointUrl = process.env.OPCUA_ENDPOINT || 'opc.tcp://localhost:4840';
const client = OPCUAClient.create({ endpoint_must_exist: false });

async function withSession(callback) {
  await client.connect(endpointUrl);
  const session = await client.createSession();
  try {
    return await callback(session);
  } finally {
    await session.close();
    await client.disconnect();
  }
}

app.get('/tags/:nodeId', async (req, res) => {
  try {
    const value = await withSession(session =>
      session.read({ nodeId: req.params.nodeId, attributeId: AttributeIds.Value })
    );
    res.json({ value: value.value.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tags/:nodeId', async (req, res) => {
  try {
    await withSession(session =>
      session.write({
        nodeId: req.params.nodeId,
        attributeId: AttributeIds.Value,
        value: { value: { dataType: 'Boolean', value: req.body.value } }
      })
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
