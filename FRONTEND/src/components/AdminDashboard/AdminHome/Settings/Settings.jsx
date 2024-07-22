import { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Grid,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axiosInstance from "../../../../axiosConfig";

const Settings = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [transporterKey, setTransporterKey] = useState("");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [transporterKeyError, setTransporterKeyError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setID] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/auth/admin/settings");
      setContactNumber(response.data.contact_number || "");
      setEmail(response.data.email || "");
      setTransporterKey(response.data.transporter_key || "");
      setID(response.data.id);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactNumberChange = (e) => {
    const value = e.target.value;
    if (/^[0]\d*$/.test(value) && value.length <= 10) {
      setContactNumber(value);
      setContactNumberError(false);
    } else {
      setContactNumberError(true);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value));
  };

  const handleTransporterKeyChange = (e) => {
    let value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    const formattedValue = value
      .split(/(.{4})/)
      .filter(Boolean)
      .join("-");
    setTransporterKey(formattedValue);
    setTransporterKeyError(formattedValue.length !== 19);
  };

  const handleSave = async () => {
    if (
      !contactNumberError &&
      !emailError &&
      !transporterKeyError &&
      id !== ""
    ) {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmSave = async () => {
    setConfirmDialogOpen(false);
    setSaving(true);

    try {
      const response = await axiosInstance.put("/auth/admin/settings", {
        contactNumber,
        email,
        transporterKey,
        id,
      });
      if (response.status === 200) {
        console.log("Settings saved successfully!");
        fetchSettings();
      } else {
        console.error("Error saving settings:", response.status);
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container style={{ padding: "30px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Settings
      </Typography>
      {loading || saving ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                style={{ display: "flex", flexDirection: "column" }}
              >
                <InputLabel
                  htmlFor="contactNumber"
                  shrink
                  style={{ backgroundColor: "#fff", padding: "0 5px" }}
                  error={contactNumberError}
                >
                  Contact Number
                </InputLabel>
                <OutlinedInput
                  id="contactNumber"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                  placeholder="Enter 10-digit number starting with 0"
                  type="tel"
                  error={contactNumberError}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                style={{ display: "flex", flexDirection: "column" }}
              >
                <InputLabel
                  htmlFor="email"
                  shrink
                  style={{ backgroundColor: "#fff", padding: "0 5px" }}
                  error={emailError}
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  type="email"
                  error={emailError}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                style={{ display: "flex", flexDirection: "column" }}
              >
                <InputLabel
                  htmlFor="transporterKey"
                  shrink
                  style={{ backgroundColor: "#fff", padding: "0 5px" }}
                  error={transporterKeyError}
                >
                  Transporter Key
                </InputLabel>
                <OutlinedInput
                  id="transporterKey"
                  value={transporterKey}
                  onChange={handleTransporterKeyChange}
                  placeholder="Enter your transporter key (e.g., fdsf-fds3-gth3-gfvs)"
                  type="text"
                  required
                  error={transporterKeyError}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={
                  contactNumberError || emailError || transporterKeyError
                }
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          Are you sure you want to save these settings?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
