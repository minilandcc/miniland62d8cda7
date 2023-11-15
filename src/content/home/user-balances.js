// auth - firebase mail link
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GetUserForm } from "../../services/srvc-utilities";
import { GetLocalUser, GetLocalBusiness } from "../../services/srvc-auth-user";

import AccountsTransitBalanceModule from "../accounts/accounts-balance-transit";
import AccountsAssetBalanceModule from "../accounts/accounts-balance-assets";

export default function UserBalancesModule () {

  const navigate = useNavigate();
  const usxx = GetUserForm()
  const usrx = GetLocalUser()
  const temx = GetLocalBusiness()
  const asset = usxx === 'user' ? usrx : temx


  return (
  <>
    
    <div className="row g-2">
      <div className="col">

        <AccountsTransitBalanceModule />

      </div>
      <div className="col">

      <AccountsAssetBalanceModule />

      </div>
    </div>

  </>

  )
}