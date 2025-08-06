

locations_id, location_name
agency_id  subdomain
franchisor_id new_franchisor_name





-- franchisor_id 

profile_id   caregiver_id  agency_id  
external_id   locations_id 
  first_name last_name email  phone_number  gender birthday_date   onboarding_date
applicant  applicant_status status





applicant_status


没有身份证号码 ， 一个人可以注册多个 caregiver_id  吗？
franchisor 没有名字，添加一个字段


用 caregiver_id 分库


caregivers, carelogs, agencies, locations, documentation
normalization for caregiver overtime and agency details

caregivers 在多个 agencies 工作

加 index