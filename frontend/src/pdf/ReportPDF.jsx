import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1e293b",
  },

  header: {
    marginBottom: 20,
  },

  brand: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4361ee",
    marginBottom: 2,
  },

  subtitle: {
    fontSize: 8,
    color: "#64748b",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },

  description: {
    fontSize: 9,
    color: "#64748b",
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 14,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 6,
    padding: 10,
  },

  summaryLabel: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 6,
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 10,
  },

  table: {
    width: "100%",
    marginBottom: 20,
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 6,
    marginBottom: 2,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  category: {
    width: "40%",
  },

  number: {
    width: "20%",
  },

  rate: {
    width: "20%",
  },

  headerText: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#64748b",
  },

  cellText: {
    fontSize: 8,
    color: "#334155",
  },

  rateText: {
    fontSize: 8,
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 32,
    right: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },

  footerText: {
    fontSize: 7,
    color: "#94a3b8",
  },
});

export default function ReportPDF({ report }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>Resolve</Text>
          <Text style={styles.subtitle}>Staff Portal</Text>
        </View>

        {/* Report Title */}
        <Text style={styles.title}>
          {report.reportType || "Complaint Report"}
        </Text>

        <Text style={styles.description}>Report period: {report.period}</Text>

        <View style={styles.divider} />

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total Complaints</Text>
            <Text style={styles.summaryValue}>
              {report.summary.total.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={styles.summaryValue}>
              {report.summary.completed.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={styles.summaryValue}>
              {report.summary.pending.toLocaleString()}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>In Progress</Text>
            <Text style={styles.summaryValue}>
              {report.summary.processed.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Category Table */}
        <Text style={styles.sectionTitle}>Complaints by Category</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.category, styles.headerText]}>CATEGORY</Text>

            <Text style={[styles.number, styles.headerText]}>TOTAL</Text>

            <Text style={[styles.number, styles.headerText]}>COMPLETED</Text>

            <Text style={[styles.rate, styles.headerText]}>
              COMPLETION RATE
            </Text>
          </View>

          {report.categories.map((item) => {
            const resolutionRate =
              item.total > 0 ? (item.completed / item.total) * 100 : 0;

            return (
              <View style={styles.tableRow} key={item.category}>
                <Text style={[styles.category, styles.cellText]}>
                  {item.category}
                </Text>

                <Text style={[styles.number, styles.cellText]}>
                  {item.total.toLocaleString()}
                </Text>

                <Text style={[styles.number, styles.cellText]}>
                  {item.completed.toLocaleString()}
                </Text>

                <Text style={[styles.rate, styles.rateText]}>
                  {resolutionRate.toFixed(1)}%
                </Text>
              </View>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Resolve Internal Document - Confidential
          </Text>

          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
