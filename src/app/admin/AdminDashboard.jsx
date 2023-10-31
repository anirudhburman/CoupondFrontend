import { BarChart, LineChart } from "@mui/x-charts";
import React from "react";
import { Box, Container, Grid, Paper, Typography } from "@mui/material"; // Import necessary MUI components

function AdminDashboard() {
  const companies = [
    "Amazon",
    "Puma",
    "Baskin Robbins",
    "Myntra",
    "Flipkart",
    "Dominos",
    "PizzaHut",
    "McDonald's",
  ];

  const noOfCoupons = [2346, 1435, 1003, 685, 1609, 2120, 1223, 1476];

  const totalCoupons = noOfCoupons.reduce((total, n) => total + n);

  const usersData = [2523, 435, 1012, 1441, 1878, 2390, 3490, 4878];

  const timesOfDay = [
    "12 AM",
    "3 AM",
    "6 AM",
    "9 AM",
    "12 PM",
    "3 PM",
    "6 PM",
    "9 PM",
  ];

  // Calculate the sum of active users
  const sumActiveUsers = usersData.reduce((total, users) => total + users, 0);

  // Calculate the average number of active users
  const avgActiveUsers = sumActiveUsers / usersData.length;

  return (
    <>
      <Paper elevation={3} style={{ padding: "50px", marginBottom: "20px" }}>
        <Typography variant="h4">Admin Dashboard</Typography>
      </Paper>
      <Container style={{ margin: "5em 0" }}>
        <Grid container>
          <Grid
            item
            padding={2}
            xs={12}
            md={5}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography variant="h6">
              Number of Coupons sold based on each Brand <br />
              Total Coupons sold: {totalCoupons}
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <BarChart
              xAxis={[
                {
                  id: "barCategories",
                  data: companies,
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  data: noOfCoupons,
                },
              ]}
              width={750}
              height={300}
              tooltip={{ trigger: "item" }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            margin: "5em 0",
          }}
        >
          <Grid item xs={12} md={7}>
            <LineChart
              width={650}
              height={300}
              series={[
                {
                  data: usersData,
                  label: "Number of Active Users",
                  area: true,
                  showMark: false,
                },
              ]}
              xAxis={[{ scaleType: "point", data: timesOfDay }]}
              sx={{
                ".MuiLineElement-root": {
                  display: "none",
                },
              }}
            />
          </Grid>
          <Grid
            item
            padding={2}
            xs={12}
            md={5}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              Number of active Users by Time of Day <br />
              Average number of active users at any time in a day:{" "}
              {avgActiveUsers}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AdminDashboard;
