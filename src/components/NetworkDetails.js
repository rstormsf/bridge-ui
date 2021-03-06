import React from 'react'
import copyIcon from '../assets/images/icons/copy.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import numeral from 'numeral'
import { getExplorerUrl } from '../stores/utils/web3'

export const NetworkDetails = ({
  isHome,
  networkData,
  url,
  logo,
  address,
  currency,
  maxCurrentLimit,
  maxPerTx,
  minPerTx,
  tokenAddress,
  totalSupply,
  totalBalance,
  balance
 }) => {
  const networkTitle = isHome ? 'Home' : 'Foreign'
  const action = isHome ? 'Deposit' : 'Withdraw'
  const logoClass = isHome ? 'home-logo' : 'foreign-logo'
  const totalTitle = isHome ? 'Total Contract Balance' : 'Total Supply'
  const totalAmount = isHome ? totalBalance : totalSupply
  const explorerPath = getExplorerUrl(networkData.id) + (isHome ? 'account/' : 'address/')

  return (
    <div className="network-details">
        <div className="details-logo-container">
          <img className={logoClass} src={logo} alt="home logo"/>
      </div>
      <div className="details-body">
        <p className="details-data-container">
          <span className="details-label">RPC Url</span>
          <span className="details-description">{url}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">{networkTitle} Address</span>
            <span className="details-description details-copy">
              <a className="details-description"  href={explorerPath+address} target="_blank" >
                {address.slice(0,27).concat('...')}
              </a>
              <CopyToClipboard text={address}>
                <img className="info-icon-right" src={copyIcon} alt=""/>
              </CopyToClipboard>
            </span>
        </p>
        <p className="details-data-container">
          <span className="details-label">Current {action} Limit</span>
          <span className="details-description-bold">{maxCurrentLimit} {currency}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">Maximum Amount Per Transaction Limit</span>
          <span className="details-description-bold">{maxPerTx} {currency}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">Minimum Amount Per Transaction</span>
          <span className="details-description-bold">{minPerTx} {currency}</span>
        </p>
        {!isHome && (
          <p className="details-data-container">
            <span className="details-label">Token Address</span>
            <span className="details-description details-copy">
              <a className="details-description" href={explorerPath+tokenAddress} target="_blank" >
                {tokenAddress.slice(0,27).concat('...')}
              </a>
              <CopyToClipboard text={tokenAddress}>
                <img className="info-icon-right" src={copyIcon} alt=""/>
              </CopyToClipboard>
            </span>
          </p>
        )}
        <p className="details-data-container">
          <span className="details-label">{totalTitle}</span>
          <span className="details-description-bold">{numeral(totalAmount).format('0.00', Math.floor)} {currency}</span>
        </p>
        <p className="details-data-container">
          <span className="details-label">Your {currency} Balance</span>
          <span className="details-description-bold">{numeral(balance).format('0.00', Math.floor)} {currency}</span>
        </p>
      </div>
    </div>
  )
}
