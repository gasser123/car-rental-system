interface CustomerReservation{
reservation_id: number; 
reservation_date: string; 
pickup_date: string; 
return_date: string;
total_amount: number; 
plate_id: string;
model: string; 
year: string; 
color: string; 
image_url: string; 
pickup_country: string; 
pickup_city: string; 
pickup_address: string; 
return_country: string; 
return_city: string;  
return_address: string; 

}

export default CustomerReservation;