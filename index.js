const {
  AzureAuthorityHosts,
  ClientSecretCredential,
} = require("@azure/identity");
const { CertificateClient } = require("@azure/keyvault-certificates");
const dotenv = require("dotenv");

dotenv.config();

const credential = new ClientSecretCredential(
  process.env.TENANT_ID,
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  {
    authorityHosts: AzureAuthorityHosts.AzureGovernment,
  }
);

// Build the URL to reach your key vault
const vaultName = process.env.VAULT_NAME;
const url = `https://${vaultName}.vault.azure.net`;

// Lastly, create our certificates client and connect to the service
const client = new CertificateClient(url, credential);

async function main() {
  // const result = client.getCertificate('www.stork.ph-storkph')
  try {
    console.log(await client.listPropertiesOfCertificates().next());
    for await (let certificateProperties of client.listPropertiesOfCertificates()) {
      console.log("Certificate properties: ", certificateProperties);
    }
  } catch (err) {
    console.log(`Error! => ${err}`);
  }
}

main();
