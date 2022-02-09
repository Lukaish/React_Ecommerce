import React, { useEffect } from "react";
import Menu from "../../components/Menu";
import Link from "@material-ui/core/Link";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';

import { useShop } from "../../context/shop";
import { FormatCurrency } from "../../utils/formatCurrency";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Shop() {
  const { productsShop, setProductsShop } = useShop();

  useEffect(() => {
    const formatData = productsShop.map((prod) => {
      return { ...prod, valueFormatted: FormatCurrency(prod.value) };
    });
    setProductsShop(formatData);
  }, []);

  console.log(productsShop)

  return (
    <React.Fragment>
      <Menu />
      <div>
        <Typography variant="h5" component="h2">
          Sua Sacola
        </Typography>
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell align="space-evenly">Valor Unitário</StyledTableCell>
              <StyledTableCell align="space-evenly">Descrição</StyledTableCell>
              <StyledTableCell align="space-evenly">Quantidade</StyledTableCell>
              <StyledTableCell align="space-evenly">Valor Total</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {productsShop.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.title}</StyledTableCell>
                <StyledTableCell align="space-evenly">{product.valueFormatted}</StyledTableCell>
                <StyledTableCell align="space-evenly">{product.description}</StyledTableCell>
                <StyledTableCell align="space-evenly">{product.amount}</StyledTableCell>
                <StyledTableCell align="space-evenly">R$ {(product.amount * product.value).toFixed(2)}</StyledTableCell>
              </StyledTableRow>           
            ))}            
          </TableBody>
          
        </Table>
      </div>
    </React.Fragment>
  );
  
}

export default Shop;
