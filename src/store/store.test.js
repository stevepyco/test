import { User, Bill } from './store';
import { CUSTOMER_TYPE, USER_TYPE, LOYALTY_YEAR_TO_BE_PREMIUM_CUSTOMER, DISCOUNT_AMOUNT, DISCOUNT_RATE } from '../constants/constants';

describe('Discount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('30% if user is employee', () => {
    // Arrange
    const fakeDate = new Date("Thu Dec 19 2019");
    const user = new User("Thuan Dong", 'EMPLOYEE', fakeDate);
    const bill = new Bill(user, 1000);

    // Act
    const billDiscountedByPercentage = bill.discountPaymentByPercentage();
    const billDiscountedLastResult = bill.handleDiscount()

    // Assert
    expect(billDiscountedByPercentage).toEqual(700);
    expect(billDiscountedLastResult).toEqual(665);
  });

  test('10% if user is a store\'s affiliate', () => {
    // Arrange
    const fakeDate = new Date("Thu Dec 19 2019");
    const user = new User("Thuan Dong", 'AFFILIATE', fakeDate);
    const bill = new Bill(user, 1000);
    
    // Act
    const billDiscountedByPercentage = bill.discountPaymentByPercentage();
    const billDiscountedLastResult = bill.handleDiscount()

    // Assert
    expect(billDiscountedByPercentage).toEqual(900);
    expect(billDiscountedLastResult).toEqual(855);
  });

  test('5% if user has been a customer over 2 years', () => {
    // Arrange
    const fakeDate = new Date("Thu Dec 19 2015");
    const user = new User("Thuan Dong", 'CUSTOMER', fakeDate);
    const bill = new Bill(user, 1000);
    
    // Act
    const billDiscountedByPercentage = bill.discountPaymentByPercentage();
    const billDiscountedLastResult = bill.handleDiscount()

    // Assert
    expect(billDiscountedByPercentage).toEqual(950);
    expect(billDiscountedLastResult).toEqual(905);
  });

  test('0% if user is less 2 years', () => {
    // Arrange
    const fakeDate = new Date("Thu Dec 19 2019");
    const user = new User("Thuan Dong", 'CUSTOMER', fakeDate);
    const bill = new Bill(user, 1000);
    
    // Act
    const billDiscountedByPercentage = bill.discountPaymentByPercentage();
    const billDiscountedLastResult = bill.handleDiscount()

    // Assert
    expect(billDiscountedByPercentage).toEqual(1000);
    expect(billDiscountedLastResult).toEqual(950);
  });

  test('$5 on every $100 on the bill', () => {
    // Arrange
    const fakeDate = new Date("Thu Dec 19 2019");
    const user = new User("Thuan Dong", 'CUSTOMER', fakeDate);
    const bill = new Bill(user, 990);
    
    // Act
    const billDiscountedPaymentByAmount = bill.discountPaymentByAmount(990);
    const billDiscountedLastResult = bill.handleDiscount();

    // Assert
    expect(billDiscountedPaymentByAmount).toEqual(945);
    expect(billDiscountedLastResult).toEqual(945);
  });

  describe('if user is a grocery, discount', () => {
    test('$5 on every $100 on the bill', () => {
      // Arrange
      const fakeDate = new Date("Thu Dec 19 2015");
      const user = new User("Thuan Dong", 'GROCERY', fakeDate);
      const bill = new Bill(user, 990);
    
      // Act
      const billDiscountedPaymentByAmount = bill.discountPaymentByAmount(990);
      const billDiscountedLastResult = bill.handleDiscount();

      // Assert
      expect(billDiscountedPaymentByAmount).toEqual(945);
      expect(billDiscountedLastResult).toEqual(945);
    });
  
    test('0% because it\'s not allowed to calculate by percentage', () => {
      // Arrange
      const fakeDate = new Date("Thu Dec 19 2015");
      const user = new User("Thuan Dong", 'GROCERY', fakeDate);
      const bill = new Bill(user, 990);
    
      // Act
      const billDiscountedLastResult = bill.handleDiscount();

      // Assert
      expect(billDiscountedLastResult).toEqual(945);
    });
  })
});