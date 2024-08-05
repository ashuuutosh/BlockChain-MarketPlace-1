

export function WalletNotDetected ()
{
    return(
        <div className="container">
           Wallet Not Detected. Please install{` `}
             <a target="_blank" rel="noreferrer" className="link" href="https://metamask.io/download/"> 
             Metamask Browser Extension</a>
        </div>
    )
}