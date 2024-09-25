import { Grid } from "@mui/material";

const Dashboard = () => (
  <Grid container spacing={6} sx={{ marginTop: "1rem", paddingX: "2rem" }}>
    <Grid item xs={6}>
      <h2>mybookr.io</h2>

      <iframe
        width="100%"
        height="205"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=Live&actionToWidgetize=getSimpleLastVisitCount&idSite=21&period=day&date=today"
      />

      <iframe
        width="100%"
        height="750"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=VisitOverviewWithGraph&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=21&period=day&date=today"
      />
      <iframe
        width="100%"
        height="350"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite=21&period=day&date=today"
      />

      <h3>Conversions:</h3>
      <iframe
        width="100%"
        height="380"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=Goal_1&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=21&period=day&date=today"
      />
    </Grid>
    <Grid item xs={6}>
      <h2>Eco Dive Bali</h2>

      <iframe
        width="100%"
        height="205"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=Live&actionToWidgetize=getSimpleLastVisitCount&idSite=23&period=day&date=today"
      />

      <iframe
        width="100%"
        height="750"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=VisitOverviewWithGraph&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=23&period=day&date=today"
      />
      <iframe
        width="100%"
        height="350"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&disableLink=1&widget=1&moduleToWidgetize=UserCountryMap&actionToWidgetize=visitorMap&idSite=23&period=day&date=today"
      />

      <h3>Conversions:</h3>
      <iframe
        width="100%"
        height="380"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=Goal_1&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=23&period=day&date=today"
      />
    </Grid>
  </Grid>
);

export default Dashboard;
