import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import moment from "moment";
import "ag-grid-community/styles//ag-grid.css";
import "ag-grid-community/styles//ag-theme-alpine.css";
import { toast, ToastContainer } from "react-toastify";

const dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight, cellValue) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("-");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

const AppointmentList = ({ onclick, Data }) => {
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const appointdata = [];
  const arr = Data || [];
  arr.forEach((item) => {
    appointdata.push({
      client: item?.telephone?.firstname,
      service: item?.service_id?.servicename,
      barber: item?.teammember_id?.firstname,
      amount: item?.service_id?.amount,
      date: moment(item.start_time).format("DD-MM-YYYY"),
    });
  });

  const columns = [
    { headerName: "Client", field: "client" },
    { headerName: "Service", field: "service" },
    { headerName: "Barber", field: "barber" },
    { headerName: "Amount", field: "amount" },
    {
      headerName: "Date",
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
  ];
  const defColumnDefs = { flex: 1 };

  const onGridReady = (params) => {
    setGridApi(params);
  };
  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") return "inRange";
    else if (startDate !== "") return "greaterThan";
    else if (endDate !== "") return "lessThan";
  };
  useEffect(() => {
    if (gridApi) {
      if (startDate !== "" && endDate !== "" && startDate > endDate) {
        toast.info("Start Date should be before End Date");
        setEndDate("");
      } else {
        var dateFilterComponent = gridApi.api.getFilterInstance("date");
        dateFilterComponent.setModel({
          type: getFilterType(),
          dateFrom: startDate ? startDate : endDate,
          dateTo: endDate,
        });
        gridApi.api.onFilterChanged();
      }
    }
  }, [startDate, endDate]);

  return (
    <>
      <ToastContainer />
      <div className="back">
        <div className="card-header border-0 pb-0 d-sm-flex d-block">
          <div>
            <h4 className="card-title mb-1">Appointmnents List</h4>
            <button className="text-black" onClick={onclick}>
              <small>Back</small>
            </button>
          </div>
          <div className="card-action card-tabs mt-3 mt-sm-0">
            <ul className="nav nav-tabs" role="tablist">
              <div>
                <div>
                  From :{" "}
                  <input
                    type="date"
                    className="rounded px-2 bg-gray-50"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  To :{" "}
                  <input
                    type="date"
                    className="rounded px-2 bg-gray-50"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="pt-2">
          <div
            className="container h-[370px] overflow-y-auto scrollbar-hide"
            id="DZ_W_Todo1"
          >
            <div
              className="ag-theme-alpine overflow-auto"
              style={{ height: 400, width: 500 }}
            >
              <AgGridReact
                rowData={appointdata}
                columnDefs={columns}
                defaultColDef={defColumnDefs}
                onGridReady={onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentList;
