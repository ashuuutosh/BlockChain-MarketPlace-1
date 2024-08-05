
export function ConnectWallet ({connect})
{
    return(
        <div className="container">
            <div>Please, Connect to Wallet to enter the application.</div>
            <br/>
            <div>
            <button onClick={connect} className="action-button">
                Connect To Wallet 
            </button>
        </div>
        </div>
    )
}