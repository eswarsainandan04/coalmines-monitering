"use client"

import { useRef, useState, useEffect } from "react"
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import {
  EnergySavingsLeaf,
  TrendingUp,
  Summarize,
  ContactMail,
  LocationOn,
  BarChart,
  Timeline,
} from "@mui/icons-material"
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import bgImage from "./bg.webp"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend)

const theme = createTheme({
  palette: {
    primary: {
      main: "#388e3c",
    },
    secondary: {
      main: "#ff7043",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      marginBottom: "1rem",
    },
  },
})

const useStyles = makeStyles(() => ({
  "@keyframes fadeInSlideUp": {
    from: {
      opacity: 0,
      transform: "translateY(20px) scale(0.95)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0) scale(1)",
    },
  },
  hero: {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: "89vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroText: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "1.5rem",
    animation: "$fadeInSlideUp 1.5s ease-out",
    animationFillMode: "both",
    borderRadius: "10px",
    maxWidth: "1000px",
    margin: "0 auto",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  ctaButton: {
    borderRadius: "4px !important",
    textTransform: "none !important",
    transition: "all 0.3s ease-in-out !important",
    cursor: "pointer !important",
    marginTop: "2rem !important",
    animation: `$fadeInSlideUp 1s ease-in-out !important`,
    padding: "12px 24px !important",
    fontSize: "1.1rem !important",
    fontWeight: "bold !important",
    "&:hover": {
      transform: "translateY(-3px) !important",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2) !important",
    },
  },
  section: {
    padding: "5rem 0",
    maxWidth: "100%",
    width: "100%",
    margin: "0 auto",
  },
  chartSection: {
    marginBottom: "50px",
    padding: "1rem 0 3rem",
  },
  benefitsSection: {
    backgroundColor: "#e8f5e9",
    padding: "5rem 2rem",
    borderRadius: "8px",
    margin: "2rem 0",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    transition: "transform 0.3s, box-shadow 0.3s",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
    },
  },
  cardContent: {
    flexGrow: 1,
    padding: "1rem",
  },
  gridItem: {
    display: "flex",
    height: "auto",
    padding: "0.75rem",
    width: "33.333%",
    "@media (max-width: 960px)": {
      width: "50%",
    },
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  featureIcon: {
    marginRight: "1rem",
    fontSize: "3rem",
    color: theme.palette.primary.main,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "rotate(10deg)",
    },
  },
  footer: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "3rem 0",
    borderTop: "4px solid #388e3c",
  },
  clickableCard: {
    cursor: "pointer",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(135deg, transparent 95%, #388e3c 95%)",
      opacity: 0.5,
      transition: "opacity 0.3s ease",
    },
    "&:hover::after": {
      opacity: 0.8,
    },
  },
  expandedCard: {
    height: "160px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  carbonFootprintContainer: {
    padding: "3rem 0",
    background: "linear-gradient(to bottom, #f9f9f9, #ffffff)",
    borderRadius: "12px",
    margin: "2rem 0",
  },
  carbonFootprintTitle: {
    fontWeight: "bold",
    fontSize: "2.2rem",
    marginBottom: "2rem",
    textAlign: "center",
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "80px",
      height: "4px",
      backgroundColor: theme.palette.primary.main,
      borderRadius: "2px",
    },
  },
  carbonFootprintPaperCard: {
    marginLeft:"30px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    height: "50%",
    width:"170px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
    },
  },
  pieChartBox: {
    width: "100%",
    height: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBox: {
    width: "60%",
    height: "200px",
    backgroundColor: "#f5f5f5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "8px",
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
  },
  carbonFootprintGraphBox: {
    marginTop: "2rem",
    borderRadius: "8px",
    overflow: "hidden",
  },
  mineDataTableContainer: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    "& .MuiTableHead-root": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiTableHead-root .MuiTableCell-root": {
      color: "white",
      fontWeight: "bold",
    },
    "& .MuiTableRow-root:hover": {
      backgroundColor: "rgba(56, 142, 60, 0.08) !important",
    },
  },
  simulationButton: {
    margin: "0.5rem",
    padding: "12px 24px",
    borderRadius: "6px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  featuresContainer: {
    display: "flex",
    flexWrap: "wrap",
    margin: "0 -0.75rem",
    justifyContent: "flex-start",
  },
   carbonCard: {
    padding: "1.8rem",
    textAlign: "center",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    borderRadius: "12px",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
    },
  },
}))

const Homepage = () => {
  const classes = useStyles()
  const keyFeaturesRef = useRef(null)
  const carbonFootprintRef = useRef(null)

  const handleScrollToFeatures = () => {
    keyFeaturesRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  const navigate = useNavigate() // Using the useNavigate hook

  const handleCardClick = (feature) => {
    if (feature === "Emission Quantification") {
      navigate("/EmissionSummary")
    } else if (feature === "Carbon Neutrality Pathways") {
      navigate("/Mainneutrality")
    } else if (feature === "Coal Mine Summary") {
      navigate("/MineSummary")
    } else if (feature === "Future Emission Prediction") {
      navigate("/EmissionSummary#activity-wise")
    } else if (feature === "Activity-wise Emission Prediction") {
      navigate("/EmissionSummary#activity-wise") // Adding the hash to the URL
    } else if (feature === "Mines Locations") {
      navigate("/MineLocation")
    }
  }
  // Carbon Footprint data state and fetching logic
  const [emissionData, setEmissionData] = useState({
    totalCarbonEmissions: 0,
    totalMethaneEmissions: 0,
    breakdown: [],
  })
  const [isInView, setIsInView] = useState(false) // Track if the section is in view
  const [animatedValues, setAnimatedValues] = useState({
    totalCarbonEmissions: 0,
    totalMethaneEmissions: 0,
    totalFuelEmissions: 0,
    totalElectricityEmissions: 0,
  })
  // Use IntersectionObserver to detect when the Carbon Footprint section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true) // Trigger animation when in view
        }
      },
      {
        root: null,
        threshold: 0.5, // Adjust as needed (50% visibility triggers)
      },
    )

    if (carbonFootprintRef.current) {
      observer.observe(carbonFootprintRef.current)
    }


  }, [])

  // Animate values when the section is in view
  useEffect(() => {
    if (isInView) {
      // Animate each value over 2 seconds
      const duration = 2000
      const startTimestamp = performance.now()

      const animateValue = (start, end, callback) => {
        const step = (timestamp) => {
          const progress = Math.min((timestamp - startTimestamp) / duration, 1)
          const newValue = start + progress * (end - start)
          callback(newValue)

          if (progress < 1) {
            requestAnimationFrame(step)
          }
        }

        requestAnimationFrame(step)
      }

      animateValue(0, emissionData.totalCarbonEmissions / 1_000_000, (value) =>
        setAnimatedValues((prev) => ({ ...prev, totalCarbonEmissions: value })),
      )
      animateValue(0, emissionData.totalMethaneEmissions / 1_000_000, (value) =>
        setAnimatedValues((prev) => ({ ...prev, totalMethaneEmissions: value })),
      )
      animateValue(0, emissionData.breakdown.reduce((acc, item) => acc + item.fuel_emission, 0) / 1_000_000, (value) =>
        setAnimatedValues((prev) => ({ ...prev, totalFuelEmissions: value })),
      )
      animateValue(
        0,
        emissionData.breakdown.reduce((acc, item) => acc + item.electricity_emission, 0) / 1_000_000,
        (value) => setAnimatedValues((prev) => ({ ...prev, totalElectricityEmissions: value })),
      )
    }
  }, [isInView, emissionData])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./emission_data.json")
        const data = await response.json()

        // Calculate total emissions
        const totalCarbonEmissions = data.reduce((acc, item) => acc + item.fuel_emission + item.electricity_emission, 0)
        const totalMethaneEmissions = data.reduce((acc, item) => acc + item.methane_emission, 0)

        // Prepare breakdown for the chart
        const breakdown = data.map((item) => ({
          mine: item.mine_name,
          fuel_emission: item.fuel_emission,
          electricity_emission: item.electricity_emission,
          methane_emission: item.methane_emission,
        }))

        setEmissionData({
          totalCarbonEmissions,
          totalMethaneEmissions,
          breakdown,
        })
      } catch (error) {
        console.error("Error fetching emission data:", error)
      }
    }
    fetchData()
  }, [])

  // Chart data and options for Carbon Footprint
  const chartData = {
    labels: ["Fuel Emission", "Electricity Emission", "Methane Emission"],
    datasets: [
      {
        label: "Total Annual Emission (2023)",
        data: [
          emissionData.breakdown.reduce((acc, item) => acc + item.fuel_emission, 0) / 1_000_000, // Total Fuel Emission
          emissionData.breakdown.reduce((acc, item) => acc + item.electricity_emission, 0) / 1_000_000, // Total Electricity Emission
          emissionData.totalMethaneEmissions / 1_000_000, // Total Methane Emission
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Colors for each section of the pie
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)} MT`,
        },
      },
    },
  }

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.hero}>
        <Box className={classes.heroText}>
          <Typography variant="h1">Empowering Indian Coal Mines Towards Carbon Neutrality</Typography>
          <Typography variant="h5" style={{ marginTop: "1rem" }}>
            A dedicated platform to quantify carbon footprints, explore pathways to sustainability, and support India's
            climate goals.
          </Typography>
          <Button variant="contained" color="secondary" className={classes.ctaButton} onClick={handleScrollToFeatures}>
            Get Started
          </Button>
        </Box>
      </Box>

      <Container>
        {/* Key Features Section */}
        <Box className={classes.section} ref={keyFeaturesRef}>
          <Typography variant="h2" align="center">
            Key Features
          </Typography>
          <Grid container className={classes.featuresContainer} spacing={3} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Emission Quantification")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <EnergySavingsLeaf className={classes.featureIcon} />
                    <Typography variant="h6">Emission Quantification</Typography>
                  </Box>
                  <Typography>
                    Accurately measure your mine's carbon emissions with activity-wise data input.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Carbon Neutrality Pathways")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <Timeline className={classes.featureIcon} />
                    <Typography variant="h6">Carbon Neutrality Pathways</Typography>
                  </Box>
                  <Typography>
                    Simulate various emission reduction strategies and find the best fit for your mine.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Coal Mine Summary")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <Summarize className={classes.featureIcon} />
                    <Typography variant="h6">Coal Mine Summary</Typography>
                  </Box>
                  <Typography>
                    Get a detailed summary of your coal mine’s emissions, reduction pathways, and sustainability status.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Add new features here */}
            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Future Emission Prediction")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <TrendingUp className={classes.featureIcon} />
                    <Typography variant="h6">Future Emission Prediction</Typography>
                  </Box>
                  <Typography>Predict future carbon emissions based on historical data trends.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Activity-wise Emission Prediction")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <BarChart className={classes.featureIcon} />
                    <Typography variant="h6">Activity-wise Emission Prediction</Typography>
                  </Box>
                  <Typography>Estimate emissions per activity, such as transportation or machinery use.</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
              <Card
                className={`${classes.card} ${classes.clickableCard} ${classes.expandedCard}`}
                onClick={() => handleCardClick("Mines Locations")}
              >
                <CardContent className={classes.cardContent}>
                  <Box display="flex" alignItems="center">
                    <LocationOn className={classes.featureIcon} />
                    <Typography variant="h6">Mines Locations</Typography>
                  </Box>
                  <Typography>View all active mine locations and their carbon emission statistics.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>


        {/* Carbon Footprint Section */}
        <Box ref={carbonFootprintRef} className={classes.carbonFootprintContainer}>
          <Typography className={classes.carbonFootprintTitle} variant="h2" align="center">
            Current Carbon Footprint - 2023
          </Typography>
          <br></br>
          <Grid container spacing={3}>
            {/* Second Row */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.carbonFootprintPaperCard}>
                <Typography variant="h6">Total Fuel Emission (2023)</Typography>
                <Typography variant="h3" color="primary">
                  {animatedValues.totalFuelEmissions.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">Million tons of CO2e</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.carbonFootprintPaperCard}>
                <Typography variant="h6">Total Electricity Emission (2023)</Typography>
                <Typography variant="h3" color="primary">
                  {animatedValues.totalElectricityEmissions.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">Million tons of CO2e</Typography>
              </Paper>
            </Grid>

            {/* First Row */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.carbonFootprintPaperCard}>
                <Typography variant="h6">Total Carbon Emission (2023) </Typography>
                <Typography variant="h3" color="secondary">
                  {animatedValues.totalCarbonEmissions.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">Million tons of CO2e</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper className={classes.carbonFootprintPaperCard}>
                <Typography variant="h6">Total Methane Emission (2023)</Typography>
                <Typography variant="h3" color="secondary">
                  {animatedValues.totalMethaneEmissions.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1">Million tons of CH4</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* New Box for Pie Chart and Empty Box */}
        <Box className={classes.chartSection}>
          <Grid container spacing={3} style={{ marginTop: "2rem" }}>
            {/* Left Box: Now ONLY for Pie Chart */}
            <Grid item xs={12} sm={6}>
              <Box className={classes.carbonFootprintPaperCard}>
                <Box className={classes.pieChartBox}>
                  <Pie data={chartData} options={chartOptions} />
                </Box>
              </Box>
            </Grid>

            {/* Right Box: Emission table*/}

            {/* Right Box: Emission table*/}
            <Grid item xs={12} sm={6}>
              <Box
                style={{ border: "1px solid #ccc", padding: "16px", alignSelf: "flex-end" }}
              >
                <Typography variant="h6" align="center">
                  Mine Emissions
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: "295px", overflow: "auto" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow style={{ backgroundColor: theme.palette.primary.main, color: "white" }}>
                        <TableCell style={{ fontWeight: "bold" }}>Mine Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Total Carbon Emission
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Methane Emission
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {emissionData.breakdown.map((mine, index) => (
                        <TableRow key={mine.mine} style={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white" }}>
                          <TableCell>{mine.mine}</TableCell>
                          <TableCell align="right">
                            {(mine.fuel_emission + mine.electricity_emission).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">{mine.methane_emission.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* Emission Reduction Strategies Section (Full-width) */}
        <Box className={classes.section} style={{ marginTop: "2rem" }}>
          <Box className={classes.carbonFootprintTitle} p={3}>
            <Typography variant="h2" align="center" gutterBottom>
              Emission Reduction Strategies
            </Typography>
            <Box className={classes.carbonCard}>
              <Typography variant="h5" className="call-to-action">
                Explore our simulation tools and take the first step towards a greener, carbon-neutral operation.
              </Typography>

              {/* Four Options (Buttons) with updated colors */}
              <Box mt={3} display="flex" flexDirection="column" alignItems="center" gap={2}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/CleanTechnologies"
                  className="simulation-button"
                >
                  Clean Technologies Simulation
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/RenewableEnergy"
                  className="simulation-button"
                >
                  Renewable Energy Alternatives
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#2196f3" }}
                  component={Link}
                  to="/CarbonCredits"
                  className="simulation-button"
                >
                  Carbon Credits Simulation
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#f06292" }}
                  component={Link}
                  to="/Afforestation"
                  className="simulation-button"
                >
                  Afforestation Plans
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ... (About Us and Footer sections) ... */}
        <Box className={classes.footer}>
          <Container>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Contact Us</Typography>
                <Typography>Email: info@carbonneutrality.com</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6">Partners</Typography>
                <Typography>Ministry of Coal, Govt of India</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button startIcon={<ContactMail />} variant="contained" color="secondary">
                  Start Your Journey to Carbon Neutrality Today!
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Homepage
