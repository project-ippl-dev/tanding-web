import WrapperContext from "@/app/wrapper";
import { render, screen, waitFor } from "@testing-library/react";
import OwnTournamentDetail from "../page";
import * as paymentStore from "@/store/actions/payment";
import * as eventStore from "@/store/actions/event";
import userEvent from "@testing-library/user-event";
import { PAYMENT_OWNER } from "@/store/payment";


// Utility function to render and switch to the finance tab
const renderAndSwitchToFinanceTab = async () => {
  render(
    <WrapperContext>
      <OwnTournamentDetail />
    </WrapperContext>
  );
  await waitFor(() => {
    expect(eventStore.getTournamentDetail).toHaveBeenCalled();
  });
    const tabSetting = screen.getByTestId("tab-keuangan");
    expect(tabSetting).toBeInTheDocument();
    await userEvent.click(tabSetting);
    expect(screen.getByText("Laporan Keuangan")).toBeInTheDocument();
};

describe("Pengujian bagian keuangan dalam setting ", () => {
  it("Menguji render bagian keuangan", async () => {
    await renderAndSwitchToFinanceTab();
    // Memeriksa bagian setting kelas pertandingan telah dirender
      expect(paymentStore.getPaymentForOwner).toHaveBeenCalled();
      expect(paymentStore.getPaymentTotalForOwner).toHaveBeenCalled();
    const table = screen.getByTestId("payment-table");
    expect(table).toBeInTheDocument();
    const paymentList = screen.getAllByTestId("payment-row-data");
    expect(paymentList.length).toEqual(PAYMENT_OWNER.data.length);
  })
})