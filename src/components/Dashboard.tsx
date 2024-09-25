import { Stack } from "@mui/material";

const Dashboard = () => (
  <Stack sx={{ marginTop: "1rem", width: "100%", gap: "2rem" }} direction={"row"}>
    <Stack>
      <h2>mybookr.io</h2>
      <h3>Statistics:</h3>
      <iframe
        width="100%"
        height="350"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=Goal_1&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=23&period=day&date=today"
        scrolling="yes"
      />
    </Stack>
    <Stack>
      <h2>Eco Dive Bali</h2>
      <h3>Statistics:</h3>
      <iframe
        width="100%"
        height="350"
        src="https://statistics.hashbite.net/index.php?module=Widgetize&action=iframe&containerId=Goal_1&disableLink=1&widget=1&moduleToWidgetize=CoreHome&actionToWidgetize=renderWidgetContainer&idSite=23&period=day&date=today"
        scrolling="yes"
      />
    </Stack>
  </Stack>
);

export default Dashboard;
