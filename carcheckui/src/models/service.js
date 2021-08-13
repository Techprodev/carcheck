export default class Service {
  constructor(vehicleid, veh_checkin_date, veh_delivery_date, veh_invoice_num, veh_total_bill_amount,veh_amount_paid_advance,veh_amount_paid_due,veh_payment_type,veh_service_type,veh_service_desc,veh_contact_name,veh_contact_num,veh_mileage_service ) {
    this.vehicleid               = vehicleid;
    this.veh_checkin_date        =  veh_checkin_date;
    this.veh_delivery_date       = veh_delivery_date;
    this.veh_invoice_num         = veh_invoice_num;
    this.veh_total_bill_amount   = veh_total_bill_amount;
    this.veh_amount_paid_advance = veh_amount_paid_advance;
    this.veh_amount_paid_due     = veh_amount_paid_due;
    this.veh_payment_type        = veh_payment_type;
    this.veh_service_type        = veh_service_type;
    this.veh_service_desc        = veh_service_desc;
    this.veh_contact_name        = veh_contact_name;
    this.veh_contact_num         = veh_contact_num;
    this.veh_mileage_service     = veh_mileage_service;
  }
}
