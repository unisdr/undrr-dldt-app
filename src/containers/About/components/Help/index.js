import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
const { Option } = Select;

const Help = () => {
  return (
    <>
      <div className="docs-page">
        <Row gutter={30}>
          <Col sm={2} xs={24}></Col>
          <Col sm={18} xs={24}>
            <h2>Need help?</h2>
            <p>
              If you encounter any issues or have questions regarding the DLDT
              prototype, please reach out to your UNDRR representative for
              assistance. They will be able to provide you with the necessary
              support and guidance to resolve any problems you may be facing.
            </p>
            <p>
              Alternatively, you can refer to the provided user manual or
              documentation for more detailed instructions on using the
              different features and functionalities of the prototype. The
              documentation covers topics such as data entry, analysis, settings
              configuration, and other key aspects of the DLDT prototype.
            </p>
            <p>
              For technical issues or specific inquiries related to the DLDT
              prototype, please contact the designated technical support team at
              UNDRR. They will be able to address any technical difficulties and
              provide further assistance as needed.
            </p>
            <p>
              Thank you for using the DLDT prototype, and we appreciate your
              feedback in helping us improve the system and meet your disaster
              tracking and analysis needs effectively.
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Help };
