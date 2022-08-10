ADDRESS = "0x86248F4683Ba2aF77aE4970b8291d4b35fc1cD29";
ABI = [
    {
        inputs: [],
        name: "retrieve",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "num", type: "uint256" }],
        name: "store",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

let walletConnected = false;
const walletButton = document.getElementById("walletButton");
walletButton.addEventListener("click", async () => {
    if (!walletConnected) {
        walletButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span>  Connecting ...`;
        try {
            await ethereum.request({ method: "eth_requestAccounts" });
            const accounts = await ethereum.request({
                method: "eth_accounts",
            });
            if (accounts.length > 0) {
                walletConnected = true;
            } else {
                walletConnected = false;
            }
        } catch (error) {}
    } else {
        walletConnected = false;
    }
    await walletButtonStateHandler();
});
async function walletButtonStateHandler() {
    if (walletConnected) {
        walletButton.innerHTML = "Disconnect Wallet";
        await setNumber();
    } else {
        walletButton.innerHTML = "Connect Wallet";
    }
}
const nuevoNumeroButton = document.getElementById("nuevoNumeroButton");
nuevoNumeroButton.addEventListener("click", async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const simpleStorage = new ethers.Contract(ADDRESS, ABI, signer);
    const number = document.getElementById("nuevoNumero");
    tx = await simpleStorage.store(number.value);
    await tx.wait();
    await setNumber();
});

async function setNumber() {
    numeroActual = document.getElementById("numeroActual");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const simpleStorage = new ethers.Contract(ADDRESS, ABI, signer);
    numeroActualDelContrato = await simpleStorage.retrieve();
    console.log(numeroActualDelContrato);
    numeroActual.innerHTML = numeroActualDelContrato;
}
