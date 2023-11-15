// init
import axios from "axios";
const base = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/tokenize-data-doeaf/endpoint'

// -----------------

export const AssetTransfers = async (item) => {
  
  const basx = base + '/assets/transfers';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, {headers: head});
    console.log (result)
    return ([200, 201].includes(result.status)) ? result.data : {data: false}
  } catch (error) {
    console.log (error);
    return {data: false}
  }
  
}


export const AssetUsers = async (item) => {
  
  const basx = base + '/assets/users';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, {headers: head});
    console.log (result)
    return ([200, 201].includes(result.status)) ? result.data : {data: false}
  } catch (error) {
    console.log (error);
    return {data: false}
  }
  
}



export const AssetStatistics = async (item) => {
  
  const basx = base + '/assets/statistics';
  const head = { 
    "Content-Type": "application/json",
    "Authorization": process.env.REACT_APP_WEBB_SITE_CLNT
  }
  const datx = {data: item.data, srvc: process.env.REACT_APP_WEBB_SITE_SRVC}

  var result;
  try {
    result = await axios.post(basx, datx, {headers: head});
    console.log (result)
    return ([200, 201].includes(result.status)) ? result.data : {data: false}
  } catch (error) {
    console.log (error);
    return {data: false}
  }
  
}


