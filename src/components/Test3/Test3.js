import {
  CUSTOMER_TYPE,
  USER_TYPE,
  RETAIL_TYPE,
  LOYALTY_YEAR_TO_BE_PREMIUM_CUSTOMER,
  DISCOUNT_AMOUNT,
  DISCOUNT_RATE
} from '../../constants/constants';

export class User {
  constructor(fullname, type, createdDate) {
    this.fullname = fullname;
    this.createdDate = createdDate;
    if (type === USER_TYPE.CUSTOMER) {
      this.type = this.yearOfLoyalty >= LOYALTY_YEAR_TO_BE_PREMIUM_CUSTOMER ? CUSTOMER_TYPE.PREMIUM : CUSTOMER_TYPE.REGULAR;
    } else {
      this.type = type;
    }
  }

  get yearOfLoyalty() {
    return new Date().getFullYear() - new Date(this.createdDate).getFullYear();
  }
}

export class Bill {
  constructor (user, retailType, amount) {
    this.user = user;
    this.retailType = retailType;
    this.amount = amount;
  }
  
  discountPaymentByPercentage() {
    const discountRate = DISCOUNT_RATE[this.user.type] || 0;
    return this.amount * (1 - discountRate);
  }

  discountPaymentByAmount(amount) {
    const discountAmount = Math.floor(amount / DISCOUNT_AMOUNT.AMOUNT) * DISCOUNT_AMOUNT.DISCOUNT;
    return amount - discountAmount;
  }

  handleDiscount() {
    const amount = (this.retailType === RETAIL_TYPE.GROCERY) ? this.amount : this.discountPaymentByPercentage();
    return this.discountPaymentByAmount(amount)
  }
}

export default {
  User,
  Bill
}