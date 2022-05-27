import React from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";

import CustomCheckbox from "./CustomCheckbox";
import GeeCircleStatus from "../GeeCircleStatus";

const StyledTableContainer = styled(TableContainer)`
  background-color: #f4f7fc;
  box-shadow: 0px 0px 0px 0.637838px rgba(152, 161, 178, 0.1),
    0px 0.637838px 2.55135px rgba(69, 75, 87, 0.12),
    0px 0px 1.27568px rgba(0, 0, 0, 0.08);
  border-radius: 5px;

  overflow-x: hidden;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "6px 10px",
  [`&.${tableCellClasses.head}`]: {
    color: "#464F60",
    fontSize: 10,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F2F5FA",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFFFFF",
  },
  "&#selected": {
    backgroundColor: "#EBF0FA",
  },

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const determineValue = (cell, data, i) => {
  if (cell.forcedValue) return cell.forcedValue;

  if (cell.map === "definedIndex") return i + 1;
  else if (cell.map === "definedStatus") {
    return (
      <GeeCircleStatus
        cummulativeQty={data.cummulative_qty}
        safetyStockQty={data.safety_stock_qty}
      />
    );
  } else return data[cell.map];
};

export default function GeeTable(props) {
  const ROWS_PER_PAGE = 10;

  /**
   *  How to:
   *  The Gee table is made by Theo Gee with love and tears.
   *  Countless hours have been spent to develope this flexible table.
   *  To use, you'll need to pass tableData and headCells props to the component.
   *  The headCell will define the header column. [,{label, map, width, forcedValue}].
   *    - label define the name of the column
   *    - map define the mapping between each table cells with the tableData property.
   *      there are 2 exception map values: definedIndex and definedStatus
   *      definedIndex will result in sequence number starts from 1
   *      definedStatus will result in "colored circle icon":
   *        - grey: safety_stock_qty doesn't exist
   *        - red: cummulative_qty === safety_stock_qty
   *        - green: else
   *    - forcedValue is used when there's no mapping between headCells and table data but you get the value from somewhere else.
   *      I wonder how one would find an implementation of this...
   *
   *  Optional props: onChecked & checkedID, minWidht & maxWidht. Can be set if needed.
   *
   *  Configure onChecked & checkedID to allow GeeTable to change the state on the parent components to the corresponding data ID of the row.
   *  Thus, you can know what's being checked 😎!
   *
   *  minWidht & maxWidht for styling purposes.
   *
   *  Please take a look at existing example of GeeTable implementation and follow it if you don't want to ecounter any erros 😬
   *
   *  Feel free to contact <theophilusgee17@gmail.com> for any issues/bug regarding Gee Table.
   *
   *  Cheers 🍺!
   *  Theo Gee ~ Author of Gee Components
   *
   */
  const { tableData, headCells, onChecked, checkedID, minWidth, maxWidth } =
    props;

  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <StyledTableContainer
      component={Box}
      sx={{
        minWidth: minWidth || "504px",
        maxWidth: maxWidth || "40%",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            <Stack
              component={StyledTableCell}
              alignItems="center"
              justifyItems="center"
            >
              <InfoIcon sx={{ width: "17px" }} />
            </Stack>
            {headCells.map((cell) => (
              <StyledTableCell
                key={cell.label}
                sx={() => {
                  if (cell.width) return { width: cell.width };
                  return {};
                }}
              >
                {cell.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((data, i) => (
              <StyledTableRow
                key={data.name}
                id={i === selected ? "selected" : ""}
              >
                <StyledTableCell
                  sx={{ width: "30px", padding: 0 }}
                  align="center"
                >
                  <CustomCheckbox
                    value={i}
                    selected={selected}
                    onChange={(newState) => {
                      setSelected(newState);
                      onChecked(data[checkedID]);
                    }}
                  />
                </StyledTableCell>
                {headCells.map((cell) => (
                  <StyledTableCell>
                    {determineValue(cell, data, i)}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          <StyledTableRow>
            <StyledTableCell
              colSpan={12}
              sx={{ padding: 0, backgroundColor: "#F4F7FCBF" }}
            >
              <TablePagination
                component="div"
                count={tableData.length}
                rowsPerPage={ROWS_PER_PAGE}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                sx={{
                  ".MuiTablePagination-toolbar": {
                    minHeight: "40px",
                  },
                }}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}
