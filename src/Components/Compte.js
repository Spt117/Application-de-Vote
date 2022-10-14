export default function Compte({ addr, id }) {
    const truncate = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

    function truncateAddr(address) {
        const match = address.match(truncate);
        if (!match) return address;
        return `${match[1]}…${match[2]}`;
        
    }

    function network(id) {
        if (id === 5) {
            return "Goerli"
        }
        else if (id === 11155111) {
            return "Sepolia"
        }
        else if (id === 1)
        return "Ethereum Mainnet"

    }

    if (addr)
        return (
            <div>
                <h6>Réseau :</h6>
                <p>{network(id)}</p>
                <h6>Addresse de connexion :</h6>
                <p>{truncateAddr(addr)}</p>
            </div>
        )
}