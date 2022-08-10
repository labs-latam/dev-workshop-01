ADDRESS = "0xfBC0D3A8CB29814E2986b6E512CA065635d057F9";
ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_numero",
                type: "uint256",
            },
        ],
        name: "cambiarNumero",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "obtenerNumero",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];

let walletConnected = false;

const walletButton = document.getElementById("walletButton");
walletButton.addEventListener("click", async () => {
    if (!walletConnected) {
        walletButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span>  Conectando ...`;
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
        walletButton.innerHTML = "Disconectar Wallet";
        await setNumber();
    } else {
        walletButton.innerHTML = "Connect Wallet";
    }
}

async function setNumber() {
    numeroActual = document.getElementById("numeroActual");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const simpleStorage = new ethers.Contract(ADDRESS, ABI, signer);
    numeroActualDelContrato = await simpleStorage.obtenerNumero();
    console.log(numeroActualDelContrato);
    numeroActual.innerHTML = numeroActualDelContrato;
}

const nuevoNumeroButton = document.getElementById("nuevoNumeroButton");
nuevoNumeroButton.addEventListener("click", async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const simpleStorage = new ethers.Contract(ADDRESS, ABI, signer);

    const number = document.getElementById("nuevoNumero");

    tx = await simpleStorage.cambiarNumero(number.value);

    await tx.wait();
    console.log("Listo!");

    await setNumber();
});
