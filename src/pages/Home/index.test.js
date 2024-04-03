import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), {timeout:2000});
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(< Home />)
    expect(screen.getByTestId("listOfEvents")).toBeInTheDocument()
    waitFor(() => {
      expect(screen.getByText("#DigitonPARIS")).toBeInTheDocument()
    })
  })

  it("a list a people is displayed", () => {
    render(< Home />)
    expect(screen.getByTestId("listOfPeople")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText('Isabelle')).toBeInTheDocument()
  })

  it("a footer is displayed", () => {
    render(< Home />)
    expect(screen.getByTestId("footer")).toBeInTheDocument()
    expect(screen.getByText("contact@724events.com")).toBeInTheDocument()
  })

  it("an event card, with the last event, is displayed", async () => {
    render(< Home />)
    waitFor(() => {
      expect(screen.getByTestId("lastEventCard")).toBeInTheDocument()
      expect(screen.getByRole('date')).toBeInTheDocument()
    })
  })

});