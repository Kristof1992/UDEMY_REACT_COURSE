import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { StyledTable as Table } from "../../ui/Table";
import CabinRow from "../../features/cabins/CabinRow";
// import Spinner from "ui/Spinner";

// import Menus from "ui/Menus";
// import Empty from "ui/Empty";
// import { useCabins } from "features/cabins/useCabins";
// import { useSearchParams } from "react-router-dom";
// import { Suspense } from "react";

// v2
// Right now this is not really reusable... But we will want to use a similar table for guests as well, but with different columns. ALSO, right now we are defining these columns in BOTH the TableHeader and the CabinRow, which is not good at all. Instead, it would be much better to simply pass the columns into the Table, and the table would give access to the columns to both the header and row. So how can we do that? Well we can again use a compound component! We don't HAVE to do it like this, there's a million ways to implement a table, also without CSS Grid, but this is what I chose

// v1
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  // console.log(CabinRow);
  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
