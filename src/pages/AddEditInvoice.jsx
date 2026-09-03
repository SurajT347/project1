import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  patient: "",
  department: "",
  date: new Date().toISOString().slice(0, 10),
  amount: "",
  method: "Cash",
  status: "Pending",
};

export default function AddEditInvoice({ isModal = false, onClose, onSaved }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const closeForm = onClose || (() => navigate("/billing"));

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!formData.patient.trim() || !formData.department || !formData.amount || Number(formData.amount) <= 0) {
      setError("Patient, Department, and a valid Amount are required.");
      return;
    }

    setSaving(true);
    try {
      const savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
      const nextId = `INV-${Math.max(...savedInvoices.map((invoice) => Number(invoice.id.replace("INV-", ""))), 2200) + 1}`;
      const invoice = {
        ...formData,
        id: nextId,
        patient: formData.patient.trim(),
        amount: Number(formData.amount),
      };
      localStorage.setItem("invoices", JSON.stringify([...savedInvoices, invoice]));
      onSaved?.(invoice);
      if (!onSaved) navigate("/billing");
    } catch {
      setError("Failed to create invoice. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={isModal ? "fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-3 backdrop-blur-[2px]" : "min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-100 p-4 sm:p-8"}
      onMouseDown={(event) => event.target === event.currentTarget && isModal && closeForm()}
    >
      <div className={isModal ? "max-h-[84vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25" : "mx-auto w-full max-w-3xl"}>
        <div className={isModal ? "flex items-start justify-between bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-3.5 text-white" : "rounded-3xl bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-6 py-6 text-white"}>
          <div className="flex items-center gap-3">
            {isModal && <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl shadow-inner ring-1 ring-white/20">+</div>}
            <div>
              <h1 className={isModal ? "text-xl font-bold tracking-tight" : "text-2xl font-bold"}>Create Invoice</h1>
              <p className="mt-1 text-sm text-blue-50">Create a new patient invoice.</p>
            </div>
          </div>
          {isModal && <button type="button" onClick={closeForm} aria-label="Close invoice dialog" title="Close" className="rounded-xl p-2 text-2xl leading-none text-white/75 transition hover:bg-white/15 hover:text-white">&times;</button>}
        </div>

        <form onSubmit={handleSubmit} className={isModal ? "space-y-3.5 p-5" : "space-y-5 rounded-3xl bg-white p-6 shadow-xl sm:p-8"}>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
          <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
            <InvoiceField label="Patient" required>
              <input name="patient" value={formData.patient} onChange={handleChange} placeholder="Patient name" className="invoice-input" />
            </InvoiceField>
            <InvoiceField label="Department" required>
              <select name="department" value={formData.department} onChange={handleChange} className="invoice-input">
                <option value="">Select department</option>
                {['Cardiology', 'General Medicine', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Neurology'].map((department) => <option key={department}>{department}</option>)}
              </select>
            </InvoiceField>
            <InvoiceField label="Invoice Date" required>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="invoice-input" />
            </InvoiceField>
            <InvoiceField label="Amount (INR)" required>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="1" placeholder="2500" className="invoice-input" />
            </InvoiceField>
            <InvoiceField label="Payment Method">
              <select name="method" value={formData.method} onChange={handleChange} className="invoice-input">
                <option>Cash</option><option>Card</option><option>UPI</option><option>Insurance</option>
              </select>
            </InvoiceField>
            <InvoiceField label="Status">
              <select name="status" value={formData.status} onChange={handleChange} className="invoice-input">
                <option>Pending</option><option>Paid</option><option>Overdue</option>
              </select>
            </InvoiceField>
          </div>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button type="button" onClick={closeForm} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving..." : "Create Invoice"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InvoiceField({ label, required, children }) {
  return <div><label className="mb-1 block text-sm font-medium text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>{children}</div>;
}