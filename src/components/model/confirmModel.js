import { Modal } from "antd";
import React from "react";

const ConfirmModel = (props) => {
  return (
    <div>
      <Modal
        title=""
        open={props?.open}
        onOk={props?.onOk}
        onCancel={props?.hideModal}
        okText="Remove"
        cancelText="Cancel"
      >
        <p>
          Do you really want to remove this{" "}
          <span className="font-bold">{props?.name}</span> ?
        </p>
      </Modal>
    </div>
  );
};

export default ConfirmModel;
