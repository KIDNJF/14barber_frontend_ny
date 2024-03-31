export const calculateTotalAmount = (data) => {
  let totalAmount = 0;
  if (data.listOfService) {
    for (const service of data.listOfService) {
      totalAmount += parseFloat(service.amount);
    }
  }

  if (data.products) {
    for (const product of data.products) {
      const productCost =
        parseFloat(product.productId.amount) * parseInt(product.quantity, 10);
      totalAmount += productCost;
    }
  }

  return totalAmount;
};

export const reformatData = (data) => {
  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const reformattedData = data?.map((item) => {
    const dateParts = item?.date?.split("-");
    const month = monthMap[dateParts[1]];
    return {
      date: `${month}`,
      overallTotal: item?.overallTotal,
    };
  });

  return reformattedData;
};

export const calculateTotalProductCost = (data) => {
  let totalCost = 0;
  data?.forEach((item) => {
    if (item.products && item.products.length > 0) {
      item.products?.forEach((product) => {
        const quantity = product.quantity;
        const amount = parseFloat(product?.productId?.amount);
        if (!isNaN(amount)) {
          totalCost += quantity * amount;
        }
      });
    }
  });

  return totalCost;
};

export const calculateTotalServiceCost = (data) => {
  let totalCost = 0;

  data?.forEach((item) => {
    if (item.listOfService && item.listOfService.length > 0) {
      item.listOfService?.forEach((service) => {
        const cost = parseFloat(service.amount);
        if (!isNaN(cost)) {
          totalCost += cost;
        }
      });
    }
  });

  return totalCost;
};
