import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout.js';
import { useState } from 'react';
import { ReportListToolbar } from 'src/components/reports-list/report-list-toolbar.js';
import { AddReportListDialog } from 'src/components/reports-list/add-report-list-dialog.js';
import { ReportsListResults } from 'src/components/reports-list/report-list-results.js';
import { ReportsDetailsDialog } from 'src/components/reports-list/report-details-dialog.js';

const Reports = () => {
  const [showAddReportDialog, setShowAddReportDialog] = useState(false);
  const [showReportDetailsDialog, setShowReportDetailsDialog] = useState(false);
  const handleOpenAddReport = () => setShowAddReportDialog(true);
  const handleCloseAddReport = () => setShowAddReportDialog(false);
  const handleOpenReportDetails = () => setShowReportDetailsDialog(true);
  const handleCloseReportDetails = () => setShowReportDetailsDialog(false);


  let reportlist =
    [
      {
        id: "1",
        address: {
          country: 'USA',
          state: 'West Virginia',
          city: 'Parkersburg',
          street: '2849 Fulton Street'
        },
        avatarUrl: '/static/images/avatars/avatar_3.png',
        createdAt: 1555016400000,
        email: 'ekaterina.tankova@devias.io',
        name: 'Ekaterina Tankova',
        phone: '304-428-3097'
      },
      {
        id: "2",
        address: {
          country: 'USA',
          state: 'Bristow',
          city: 'Iowa',
          street: '1865  Pleasant Hill Road'
        },
        avatarUrl: '/static/images/avatars/avatar_4.png',
        createdAt: 1555016400000,
        email: 'cao.yu@devias.io',
        name: 'Cao Yu',
        phone: '712-351-5711'
      },
    ]


  return (
    <>
      <Head>
        <title>
          Reports List | PMS
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <ReportsDetailsDialog
          open={showReportDetailsDialog}
          handleClose={handleCloseReportDetails}
        />
        <AddReportListDialog
          open={showAddReportDialog}
          handleClose={handleCloseAddReport}
        />
        <Container maxWidth={false}>
          <ReportListToolbar
            handleOpenAddReport={handleOpenAddReport}
            open={showAddReportDialog}
          />
          <Box sx={{ mt: 3 }}>
            <ReportsListResults reports={reportlist} handleOpenReportDetails={handleOpenReportDetails}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

Reports.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);


export default Reports;
