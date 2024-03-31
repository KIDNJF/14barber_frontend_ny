import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Image1 from "../../assets/images/svg/ic_stat2.svg";
import { getAllStastisticsAction } from "../../store/statistics/actions";
import { useDispatch, useSelector } from "react-redux";
import { reformatData } from "../../utils/helper";

const Graph = ({ isTablet }) => {
  const { statistic } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllStastisticsAction()(dispatch);
  }, [dispatch]);

  const totalRevenues = statistic?.all?.data?.reduce(
    (acc, total) => acc + total?.overallTotal,
    0
  );

  const reformattedData = reformatData(statistic?.all?.data);

  return (
    <div className="col-xl-12 col-xxl-12 col-lg-12 col-md-12">
  <div className="card" style={{ border: '1px solid #d1d1d1' }}>
    <div className="card-header border-0 pb-0 d-sm-flex d-block">
      <div>
        <h4 className="card-title mb-1">Revenue</h4>
      </div>
    </div>

    <div className="card-body revenue-chart px-3 w-full">
      <div className="d-flex align-items-start pr-3 pull-right revenue-chart-bar">
        <div className={`d-flex align-items-start ${!isTablet && "mx-32"}`}>
          <img
            src={Image1}
            className="mr-2 mb-1 w-[22px] h-[22px]"
            alt=""
          />
          <div>
            <small className="text-dark fs-14">Revenue</small>
            <h3 className="font-w600 mb-0">
              <span className="counter">{`${
                totalRevenues?.toLocaleString() ?? 0
              } RWF`}</span>
            </h3>
          </div>
        </div>
      </div>
      <div id="chartBar" className="mt-24 w-full">
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={reformattedData}>
      <Line
        type="monotone"
        dataKey="overallTotal"
        stroke="#000000" // Line color set to black
        strokeWidth={3}
      />
      <CartesianGrid stroke="#ccc" vertical={false} />
      <XAxis dataKey="date" stroke="#000000" tick={{ fontSize: 12 }} />
      <YAxis stroke="#000000" tick={{ fontSize: 12 }} />
      <Tooltip />
      <Legend wrapperStyle={{ fontSize: '12px', color: '#000000' }} />
    </LineChart>
  </ResponsiveContainer>
</div>

    </div>
  </div>
</div>

  );
};

export default Graph;
