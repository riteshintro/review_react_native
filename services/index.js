import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage.getItem('token').then((res)=>{
  const value = JSON.parse(res);
axios.defaults.headers.common["Authorization"]=`Bearer ${value}`
// axios.defaults.headers.common["Authorization"]=`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzEyNzc2ZmFiZGQyYjllYTBiMWM1ODRjNmI0Mzg2NzQ5YmVlY2YwM2ZlMGIwOGE4NDgxMmFkYmRlNDcyZDNiNTE3NjkxY2RmOGNiYjQzNTAiLCJpYXQiOjE3MTM3NjQxMzIuNjEwMjM3LCJuYmYiOjE3MTM3NjQxMzIuNjEwMjQzLCJleHAiOjE3NDUzMDAxMzIuNTk2Njc2LCJzdWIiOiIxNSIsInNjb3BlcyI6W119.ejjZExqN7EhoXAp0p_wUeBVq6gzQlOGBNzAhmbXyKzCzVdL5pw5BcySlns1K2rLn5KoyVU8kw_-VJfT3RWe_UB83uakzz47-w1fd2a89NpwIY1e36eKbOFS9QLpX6xDzeiLou1RS06Lpw66ukD5MdsPJrooIiuleD_2KjEMfXjF0PRRn3khk0smi1ze4C7P1HCzWplXosG4OMSw_zeyBgVSDp3WNv7rHfOIFlt9vSjLk0BmdwhV5a61IA948txJQyMRmTAtXy06C7enSQ39S6DQiNPolCtHvJkqdkYE2A8nlQyVt-aeRUgwFPqXdlBXSwfe5E9FB5Pyis1OJykwxXM6b3e_VzoP6sCYH-8TO_3C38W-XHuiWVAnQdnc673HEK0j8evKMNotnjEJf4hLqsae4ufmJNOiOXdgANZL-gxdSllX7HVWh1H2pJk9clAI8ZhL0fe9qTMTrtpCoypc7jF_5tAyQFKnxI632cHHyjedVByA9Nog-a3_rqduMTmsvc8km4bo-ss1u84L_DrS4IrYoJnP3sEiRgI8dMDwHvwpaNm51tvVIY9oLBRRg3UFYxvq-TaR69WVatkgd2ilPFIu_818tTzjsopF95PBlV_09qurHSGMnH3nKq7tjqSlprgG3vZiKxHgsaikbjvpzdOnU8sSdtsO74HjmRyf4FmA`
})

export const LoginUser = async (data) => {
// console.log(data)
// const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDMwYmJmOWI4YmI4YmRhMjRmM2RmN2RkZmViYzczMGM4ODVlYjYwYTFjN2ZjNTEwY2QzNzM4ZjZkNmQ0ODYxNzFlZTQ4NDExMzYxOGFhMDIiLCJpYXQiOjE3MDc0ODYyNjIuMDQ4NzM1LCJuYmYiOjE3MDc0ODYyNjIuMDQ4NzM3LCJleHAiOjE3MzkxMDg2NjIuMDQyOTAzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dKrgo8ay05aNZjSu-wRZKgldXYPIdMigQb-WkwC4aQ-vzzCg70Kn90NkKZaNp5fwX0a6PjhkvHxdYsD83u6al2F1LgKaklQevgSslULjaXMLoThcIbnI7NQTkY25R0PRi9PMqJHUWCkzlUoYVBzVfrSdTHiY3GhlTFEgNJqw-m8-_o0ik7SSEdx0TnG3RXIqrvatrpMBBXVc5Ei3jt1VBsQlajm_9N61aEZbsg0kWhYgjPiDIvJozV0vc_DheZ3WqwOPl38sW2kGwUwW1PYy1_2I6F-H5q55KMYP-uj5QCyY2_OKhkZjAkDrij37a_Ed6-X_LhtmFTNtFLDk14-8QilyTX-Qbbu4wioO82xV_2cU9eP8lT5XKSoa4yyZlGMnmXsIU6PshAsiSQxHvuzHa1K_c1PJ2ro8UVA0RT7LtVvU-lGcFGg6h298rGwTJ1TxeXPC-7GfOhIeaxxXR94te-qdaIp4nGw3A6sDTFJVL_HmU22afcJ4rJ2D_3W5AlFAhaMO52cgvbv1lisRtT7UMB4rveNnawYwx_E2fgJSxkzhRGio0zJY-OuneP_XnHwxEIHyFPoX6Vtk0BlCd4HaqITULG8H_CWwyWjKIzhHqTdjbd7msf6Ld7WWcFpb9O3sdmF0-5XEOBAM-_MLS1glsklViGGSw74M-dPej00fmw8"
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, data, { headers:{ 'content-Type' : 'application/json',}})     
// console.log(res)
// toast.success('Successfully Added')
return res
}
catch (err) {
// console.log(err.response.data.message)
  toast.error(`${err.response.data.message}`)
return err 
}
}

export const getAllReview = async (data) => {
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/integration/get-all-review?page=${data.page}`, 
data, 
{ headers:{
// "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzEyNzc2ZmFiZGQyYjllYTBiMWM1ODRjNmI0Mzg2NzQ5YmVlY2YwM2ZlMGIwOGE4NDgxMmFkYmRlNDcyZDNiNTE3NjkxY2RmOGNiYjQzNTAiLCJpYXQiOjE3MTM3NjQxMzIuNjEwMjM3LCJuYmYiOjE3MTM3NjQxMzIuNjEwMjQzLCJleHAiOjE3NDUzMDAxMzIuNTk2Njc2LCJzdWIiOiIxNSIsInNjb3BlcyI6W119.ejjZExqN7EhoXAp0p_wUeBVq6gzQlOGBNzAhmbXyKzCzVdL5pw5BcySlns1K2rLn5KoyVU8kw_-VJfT3RWe_UB83uakzz47-w1fd2a89NpwIY1e36eKbOFS9QLpX6xDzeiLou1RS06Lpw66ukD5MdsPJrooIiuleD_2KjEMfXjF0PRRn3khk0smi1ze4C7P1HCzWplXosG4OMSw_zeyBgVSDp3WNv7rHfOIFlt9vSjLk0BmdwhV5a61IA948txJQyMRmTAtXy06C7enSQ39S6DQiNPolCtHvJkqdkYE2A8nlQyVt-aeRUgwFPqXdlBXSwfe5E9FB5Pyis1OJykwxXM6b3e_VzoP6sCYH-8TO_3C38W-XHuiWVAnQdnc673HEK0j8evKMNotnjEJf4hLqsae4ufmJNOiOXdgANZL-gxdSllX7HVWh1H2pJk9clAI8ZhL0fe9qTMTrtpCoypc7jF_5tAyQFKnxI632cHHyjedVByA9Nog-a3_rqduMTmsvc8km4bo-ss1u84L_DrS4IrYoJnP3sEiRgI8dMDwHvwpaNm51tvVIY9oLBRRg3UFYxvq-TaR69WVatkgd2ilPFIu_818tTzjsopF95PBlV_09qurHSGMnH3nKq7tjqSlprgG3vZiKxHgsaikbjvpzdOnU8sSdtsO74HjmRyf4FmA`,
'Accept': 'application/json',
'Content-Type': 'application/json',      
}})     
// console.log(res)
return res
}
catch (err) {
return err 
}
}

export const getQrCode= async (data) => {
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/qr-code/qr-list`, 
null, 
{ headers:{
// "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzEyNzc2ZmFiZGQyYjllYTBiMWM1ODRjNmI0Mzg2NzQ5YmVlY2YwM2ZlMGIwOGE4NDgxMmFkYmRlNDcyZDNiNTE3NjkxY2RmOGNiYjQzNTAiLCJpYXQiOjE3MTM3NjQxMzIuNjEwMjM3LCJuYmYiOjE3MTM3NjQxMzIuNjEwMjQzLCJleHAiOjE3NDUzMDAxMzIuNTk2Njc2LCJzdWIiOiIxNSIsInNjb3BlcyI6W119.ejjZExqN7EhoXAp0p_wUeBVq6gzQlOGBNzAhmbXyKzCzVdL5pw5BcySlns1K2rLn5KoyVU8kw_-VJfT3RWe_UB83uakzz47-w1fd2a89NpwIY1e36eKbOFS9QLpX6xDzeiLou1RS06Lpw66ukD5MdsPJrooIiuleD_2KjEMfXjF0PRRn3khk0smi1ze4C7P1HCzWplXosG4OMSw_zeyBgVSDp3WNv7rHfOIFlt9vSjLk0BmdwhV5a61IA948txJQyMRmTAtXy06C7enSQ39S6DQiNPolCtHvJkqdkYE2A8nlQyVt-aeRUgwFPqXdlBXSwfe5E9FB5Pyis1OJykwxXM6b3e_VzoP6sCYH-8TO_3C38W-XHuiWVAnQdnc673HEK0j8evKMNotnjEJf4hLqsae4ufmJNOiOXdgANZL-gxdSllX7HVWh1H2pJk9clAI8ZhL0fe9qTMTrtpCoypc7jF_5tAyQFKnxI632cHHyjedVByA9Nog-a3_rqduMTmsvc8km4bo-ss1u84L_DrS4IrYoJnP3sEiRgI8dMDwHvwpaNm51tvVIY9oLBRRg3UFYxvq-TaR69WVatkgd2ilPFIu_818tTzjsopF95PBlV_09qurHSGMnH3nKq7tjqSlprgG3vZiKxHgsaikbjvpzdOnU8sSdtsO74HjmRyf4FmA`,
'Accept': 'application/json',
'Content-Type': 'application/json',      
}})     
// console.log(res)
return res
}
catch (err) {
return err 
}
}
export const getReviewLink = async (data) => {
// const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/review-link/list`, data, { headers:{ 'content-Type' : 'application/form-data',}})     
// console.log(res)
// toast.success('Update Sussesfully')
return res
}
catch (err) {
// toast.error('error')
return err 
}
}

export const addCompany = async (data) => {
// const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
let form=new FormData()
form.append("company_name", data.name);
form.append("logo",data.logo)
form.append("status", data.status)
form.append("total_review", data.total_review)
// console.log(form,"dd")
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/company/add`, form, { headers:{ 'content-Type' : 'application/form-data'}})     
// console.log(res)
// toast.success('Integrated Successfully')
toast.success(`${res.data.message}`);
return res
}
catch (err) {
toast.error(`${err.response.data.errors}`);
  // toast.error('error')
return err 
}
}
    
export const listCompany = async (data) => {

try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/company/list`, null, { headers:{ 'content-Type' : 'application/form-data'}})     
  // console.log(res)
  // toast.success('Integrated Successfully')
  // toast.success(`${res.data.message}`);
  return res
}
catch (err) {
  // toast.error(`${err.response.data.errors}`);
    // toast.error('error')
  return err 
}
}
    
export const deleteCompany = async (data) => {
// const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
try {
const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/company/delete/${data.id}`, { headers:{ 'content-Type' : 'application/form-data'}})     
// console.log(res)
// toast.success('Integrated Successfully')
toast.success(`${res.data.message}`);
return res
}
catch (err) {
toast.error(`${err.response.data.errors}`);
  // toast.error('error')
return err 
}
}
export const updateCompany = async (data) => {
// const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
let form=new FormData()
form.append("company_name", data.data.name);
form.append("logo",data.data.logo)
form.append("status", data.data.status)
form.append("total_review", data.data.total_review)
//  console.log(form,"dd")
try {
const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/company/update/${data.id}`, form, { headers:{ 'content-Type' : 'application/form-data'}})     
// console.log(res)
// toast.success('Integrated Successfully')
toast.success(`${res.data.message}`);
return res
}
catch (err) {
toast.error(`${err.response.data.errors}`);
  // toast.error('error')
return err 
}
}

export const getIntegration= async (data) => {
    try {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/integration/get-integration`, data, { headers:{ 'content-Type' : 'application/json'}})     
      // console.log(res)
      // toast.success('Integrated Successfully')
      return res
    }
    catch (err) {
        // toast.error('error')
      return err 
    }
}       

export const getWhatsappTemplate = async (data) => {
  // const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
  try {
  const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/whatsapp-template/list`, null, { headers:{ 'content-Type' : 'application/form-data'}})     
    // console.log(res)
    return res
  }
  catch (err) {
    return err 
  }
}

export const getEmail= async (data) => {
  // const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
  try {
  const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/email-template/list`, null, { headers:{ 'content-Type' : 'application/form-data'}})     
    // console.log(res)
    return res
  }
  catch (err) {
    return err 
  }
}

export const getSms= async (data) => {
  // const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
  try {
  const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/sms-template/list`, null, { headers:{ 'content-Type' : 'application/form-data'}})     
    // console.log(res)
    return res
  }
  catch (err) {
    return err 
  }
}

export const geCompanyById = async (data) => {
  // const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
            try {
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/company/get-by-company-id`, null, { headers:{ 'content-Type' : 'application/json',}})     
              console.log(res)
              // toast.success('Integrated Successfully')
              // toast.success(`${res.data.message}`);
              return res
            }
            catch (err) {
              // toast.error(`${err.response.data.errors}`);
                // toast.error('error')
              return err 
            }
}

export const EnableCompany = async (data) => {
  // const { data:{token} } = JSON.parse(localStorage.getItem("userInfo"));
        try {
        const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/company/enable-company`, data, { headers:{ 'content-Type' : 'application/json'}})     
          // console.log(res)
          // toast.success('Integrated Successfully')
          // toast.success(`${res.data.message}`);
          return res
        }
        catch (err) {
          // toast.error(`${err.response.data.errors}`);
            // toast.error('error')
          return err 
        }
  }