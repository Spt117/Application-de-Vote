export default function Dapp({ get, set, owner }) {


    return (
        <div>
            <h1>Data</h1>
            <p>Propriétaire du contrat : {owner}</p>
        </div>
    )
}