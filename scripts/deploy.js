
const hre = require("hardhat");
const path = require("path");
const fs = require("fs");

async function main(){
console.log("Deployment started!");

const[deployer] = await ethers.getSigners();
const address = await deployer.getAddress();
console.log(`Deploying the contract with the account: ${address}`);

const PETS_COUNT = 5;
const PetAdoption = await hre.ethers.getContractFactory("PetAdoption");
const contract = await PetAdoption.deploy(PETS_COUNT);

await contract.waitForDeployment();
console.log(`PetAdoption deployed to ${contract.target}`);

saveContractFiles(contract);
}

function saveContractFiles(contract)
{

    const contractDir = path.join(__dirname, "..", "frontend", "src", "contracts");

    if (!fs.existsSync(contractDir)) 
    {
        fs.mkdirSync(contractDir);
    }

    fs.writeFileSync(
        path.join(contractDir, `contract-address-${network.name}.json`),
        JSON.stringify({PetAdoption: contract.address}, null, 2)
    );

    const PetAdoptionArtifact = artifacts.readArtifactSync("PetAdoption");

    fs.writeFileSync(
        path.join(contractDir,  "PetAdoption.json"),
        JSON.stringify(PetAdoptionArtifact, null, 2)
    );   
}

main().catch(error => {
    console.log(error);
    process.exitCode = 1;
});

//npx hardhat run scripts/deploy.js --network localhost


/*

1. Imports:

hre: This likely refers to the Hardhat runtime environment, providing access to Hardhat functionalities.
path: This module helps with manipulating file paths.
fs: This module allows interaction with the file system (reading and writing files).
2. main Function:

This function is the entry point for the script and is marked as asynchronous (async).
It logs a message indicating the deployment has started.
It fetches the first signer (deployer) from the available accounts using ethers.getSigners().
It logs the deployer's address retrieved using deployer.getAddress().
It defines a constant PETS_COUNT specifying the number of pets (presumably in the context of the smart contract).
It uses hre.ethers.getContractFactory("PetAdoption") to get a contract factory for the "PetAdoption" contract. This likely refers to a Solidity contract file defining the contract logic.
It deploys the contract using contract = await PetAdoption.deploy(PETS_COUNT), passing the PETS_COUNT as an argument to the constructor (if defined in the contract).
It waits for the deployment to complete using await contract.waitForDeployment().
It logs the deployed contract address using contract.target.
It calls the saveContractFiles function to save the contract address and artifact.
3. saveContractFiles Function:

This function takes the deployed contract (contract) as an argument.
It constructs the path to the directory where the contract files will be saved.
It uses path.join to combine different path components.
It creates the directory if it doesn't exist using fs.mkdirSync.
It saves the contract address as a JSON file using fs.writeFileSync.
The filename includes the network name (network.name) to potentially differentiate deployments on different networks.
It reads the contract artifact using artifacts.readArtifactSync("PetAdoption"). Artifacts likely refer to compiled contract information.
It saves the contract artifact as a JSON file using fs.writeFileSync.
4. Error Handling:

The main function is wrapped in a .catch block.
If any error occurs during deployment, it will be logged to the console and the process will exit with an error code (1).
5. Running the Script:

The commented line at the bottom suggests running the script using the command: npx hardhat run scripts/deploy.js --network localhost
npx is used to execute packages from npm without installing them globally.
hardhat run is likely a Hardhat command to execute scripts.
scripts/deploy.js specifies the script file to run.
--network localhost indicates deploying to the local development network.
Overall, this script deploys the "PetAdoption" smart contract, saves the contract address and artifact for the frontend, and handles potential errors. */