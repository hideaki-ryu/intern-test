/** @jsxImportSource @emotion/react */
import React from "react";

import axios from "axios";

import { useNavigate, useState } from "react-router-dom";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { GeeCircleStatus, GeeTable } from "../../../GeeComponents";

export default function InspectedMaterial(props) {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const [inspectedMaterial, setInspectedMaterial] = React.useState({});
  const [inspectedBatches, setInspectedBatches] = React.useState([]);

  const navigate = useNavigate();

  const { inspectedMaterialID } = props;

  React.useEffect(() => {
    (async () => {
      try {
        const { data: materialData } = await axios.get(
          SERVER_URL + `/api/material/${inspectedMaterialID}`,
          {
            withCredentials: true,
          }
        );

        setInspectedMaterial(materialData.data);

        const { data: batchesData } = await axios.get(
          SERVER_URL + `/api/batches?materialID=${inspectedMaterialID}`,
          { withCredentials: true }
        );

        batchesData.data.forEach((data) => {
          data.purchase_date = formatDate(data.purchase_date);
          data.expiry_date = formatDate(data.expiry_date);
          data.purchase_price = formatPrice(data.purchase_price);
          data.price_per_unit = formatPrice(data.price_per_unit);
        });

        setInspectedBatches(batchesData.data);
      } catch (err) {
        if (err.response.status === 401) navigate("/unauthorized");
        else console.log(err);
      }
    })();
  }, [inspectedMaterialID]);

  const formatDate = (dateData) => {
    const date = new Date(dateData);
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  const formatPrice = (priceData) => {
    return "IDR " + priceData.toLocaleString("id-ID");
  };

  const calcTotalQty = () => {
    return inspectedBatches.reduce(
      (prev, current) => prev + current.current_qty,
      0
    );
  };

  const headCells = [
    { label: "NO", map: "definedIndex", width: "35px" },
    { label: "PUR. DATE", map: "purchase_date", width: "70px" },
    { label: "EX. DATE", map: "expiry_date", width: "70px" },
    { label: "QTY", map: "current_qty", width: "60px" },
    {
      label: "MEAS.",
      forceValue: inspectedMaterial.measurement_name,
      width: "70px",
    },
    { label: "PRICE/UNIT", map: "price_per_unit", width: "60px" },
    { label: "PUR. PRICE", map: "purchase_price", width: "90px" },
  ];

  return (
    <Box>
      <Box
        sx={{
          fontSize: "13px",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "15px 30px",
          boxShadow:
            "0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1), 0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12), 0px 0px 1.27568px rgba(0, 0, 0, 0.08);",
          "& > p": {
            margin: "5px 0",
            fontWeight: "500",
          },
        }}
      >
        <p>Name: {inspectedMaterial.name}</p>
        <p>
          Total Qty: {calcTotalQty()} {inspectedMaterial.measurement_name}
        </p>
        <p>
          Safety Stock: {inspectedMaterial.safety_stock_qty}{" "}
          {inspectedMaterial.measurement_name}
        </p>
        <Stack component="p" direction="row" alignItems="center">
          <p css={{ marginRight: "10px" }}>Status:</p>
          <GeeCircleStatus
            cummulativeQty={inspectedMaterial.cummulative_qty}
            safetyStockQty={inspectedMaterial.safety_stock_qty}
          />
        </Stack>
      </Box>
      <h2 css={{ fontSize: "15px", margin: "20px 0" }}>Refill Batches</h2>
      <GeeTable
        tableData={inspectedBatches}
        headCells={headCells}
        minWidth="100%"
      />
    </Box>
  );
}
