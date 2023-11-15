// routes
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

// views - main
import Main from "../views.xz/main-xz";

// views - assets
import AssetViewMain from "../views.xx/asset-view-main";


// views - home
import HomeUser from "../views.home/home-user";


// views - markets
import MarketAssetsList from "../views.market/market-assets";

// views - assets
import AssetsUser from "../views.assets/assets";
import AssetsListUser from "../views.assets/assets-list-user";
import AssetDetailsUser from "../views.assets/assets-details-user";
import AssetsUnitsDetailsUser from "../views.assets.units/units-details-user";

import AssetsUnitsDetailsInvestor from "../views.assets.units/units-details-investor";

// views - transfers - assets
import TransfersAssetsSubmit from "../views.transfers/transfers-assets-submit";

// views - transfers
import TransfersList from "../views.transfers/transfers-list";
import TransfersCreate from "../views.transfers/transfers-create";
import TransfersAccountCredit from "../views.transfers/transfers-account-credit";
import TransfersAccountDebit from "../views.transfers/transfers-account-debit";
import TransfersView from "../views.transfers/transfers-view";

// views - documents
import UserDocumentsCreateTaxcard from "../views.documents/documents-create-taxc";
import UserDocumentsCreateAadhaar from "../views.documents/documents-create-adhr";
import UserDocumentsCreateUtil from "../views.documents/documents-create-util";
import UserDocumentsCreate from "../views.documents/documents-create";
import UserDocumentsSave from "../views.documents/documents-save";

import UserDocumentsNew from "../views.documents/documents-new";

// views - accounts
import Accounts from "../views.accounts/accounts";
import AccountsNew from "../views.accounts/accounts-new";
import AccountsLinkInrxBank from "../views.accounts/accounts-link-inrx-bank";
import AccountsCreateInrxVirtual from "../views.accounts/accounts-create-inrx-virtual";
import AccountsCreateRand from "../views.accounts/accounts-create-web3-rand";

// views - network
import NetworkList from "../views.network/network-list";
import NetworkInviteUser from "../views.network/network-invite-user";


// views - user
import UserDetails from "../views.user/user-details";


// // views - auth
import AuthMailCode from "../views.auth/auth-mail-code";
import AuthNext from "../views.auth/auth-next";
import AuthSessionX from "../views.auth/auth-session-x";


// // views - onboard
import UserOnboardName from '../views.onboard/user-onboard-name'

import UserOnboardDocsTaxx from "../views.onboard/user-onboard-docs-taxx";
import UserOnboardDocsAadhaar from "../views.onboard/user-onboard-docs-aadhaar";

import UserOnboardAccountSettle from "../views.onboard/user-onboard-account-settle";
import UserOnboardAccountTransit from "../views.onboard/user-onboard-account-transit";
import UserOnboardAccountMinter from "../views.onboard/user-onboard-account-minter";

import UserOnboardStart from '../views.onboard/user-onboard-start'
import UserOnboardThanks from '../views.onboard/user-onboard-thanks'
import UserOnboardLaunch from '../views.onboard/user-onboard-launch'
import UserOnboardHold from "../views.onboard/user-onboard-hold";

import AccountMinterCreate from "../views.onboard.webx/user-account-minter";


const routes = [

  { route:'/', content: <Main />, auth:false },
  { route:'/assets/:id', content: <AssetViewMain />, auth:false },

  // user
  { route:'/user/home', content: <HomeUser />, auth:true },

  // markets
  { route:'/user/assets', content: <AssetsUser />, auth:true },

  // assets
  { route:'/user/ax/:id', content: <AssetDetailsUser />, auth:true },
  { route:'/user/au/:id', content: <AssetsUnitsDetailsUser />, auth: true },
  { route:'/user/vx/:id', content: <AssetsUnitsDetailsInvestor />, auth:true },

  // network
  { route:'/user/network', content: <NetworkList />, auth:true },
  { route:'/user/network/invite', content: <NetworkInviteUser />, auth:true },
  

  // transfers - assets
  { route:'/user/mx/:id', content: <TransfersAssetsSubmit />, auth:true },


  // transfers
  { route:'/user/transfers', content: <TransfersList />, auth:true },
  { route:'/user/tx/:id', content: <TransfersView />, auth:true },

  { route:'/user/transfers/debit', content: <TransfersCreate />, auth:true },
  { route:'/user/transfers/credit', content: <TransfersCreate />, auth:true },
  
  { route:'/user/account/credit', content: <TransfersAccountCredit />, auth:true },
  { route:'/user/account/debit', content: <TransfersAccountDebit />, auth:true },


  // accounts
  { route:'/user/accounts', content: <Accounts />, auth:true },

  { route:'/user/accounts/new', content: <AccountsNew />, auth:true },
  { route:'/user/accounts/link/bank', content: <AccountsLinkInrxBank />, auth:true },
  { route:'/user/accounts/create/virtual', content: <AccountsCreateInrxVirtual />, auth:true },
  { route:'/user/accounts/create/rand', content: <AccountsCreateRand />, auth:true },

  { route:'/user/documents/create/taxc', content: <UserDocumentsCreateTaxcard />, auth:true },
  { route:'/user/documents/create/aadhaar', content: <UserDocumentsCreateAadhaar />, auth:true },
  { route:'/user/documents/create/util', content: <UserDocumentsCreateUtil />, auth:true },
  { route:'/user/documents/create', content: <UserDocumentsCreate />, auth:true },
  { route:'/user/documents/save', content: <UserDocumentsSave />, auth:true },
  { route:'/user/documents/new', content: <UserDocumentsNew />, auth:true },

  // user
  { route:'/user/account', content: <UserDetails />, auth:true },

  // auth
  { route:'/auth', content: <AuthMailCode />, auth: false },
  { route:'/auth/next', content: <AuthNext />, auth: true },
  { route:'/auth/x', content: <AuthSessionX />, auth: true },
  
  // onboard
  { route:'/user/onboard', content: <UserOnboardName />, auth: true },
  
  { route:'/user/onboard/id/taxx', content: <UserOnboardDocsTaxx />, auth: true },
  { route:'/user/onboard/id/adhr', content: <UserOnboardDocsAadhaar />, auth: true },

  { route:'/user/onboard/ac/settle', content: <UserOnboardAccountSettle />, auth: true },
  { route:'/user/onboard/ac/transit', content: <UserOnboardAccountTransit />, auth: true },
  { route:'/user/onboard/ac/minter', content: <UserOnboardAccountMinter />, auth: true },

  { route:'/user/onboard/start', content: <UserOnboardStart />, auth: true },
  { route:'/user/onboard/thanks', content: <UserOnboardThanks />, auth: true },
  { route:'/user/onboard/launch', content: <UserOnboardLaunch />, auth: true },
  { route:'/user/onboard/hold', content: <UserOnboardHold />, auth: true },

  { route:'/accounts/minter/create', content: <AccountMinterCreate />, auth: true },

]


export default function RouteX() {

  const { user } = useAuth();
  // console.log (user)

  return (
    <Routes>
      {routes.map ((item,i)=>(item.auth
        ? <Route key={i} path={item.route} element={!user ? <Navigate to='/' replace /> : item.content} />
        : <Route key={i} path={item.route} element={item.content} />
      ))}
    </Routes>
  );
}