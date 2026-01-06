'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Ticket, CheckCircle2, AlertCircle } from 'lucide-react';
import { createTicketMock } from '../../mocks/tickets';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Textarea } from '../../components/ui/Textarea';
import { Header } from '../../components/layout/Header';

export default function OpenTicketPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createTicketMock({
        title,
        description,
        category,
        priority,
      });
      setSuccess(true);
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('');
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] pb-12 font-sans text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
            <Ticket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Support Desk PRO</h1>
            <h2 className="text-2xl font-bold text-slate-900">Open Ticket</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Describe your problem</h3>
                <p className="mt-2 text-slate-600">
                  Please fill in the information below. Our team will review it and respond as quickly as possible.
                </p>
              </div>
              
              {success && (
                <div className="mb-6 rounded-md bg-green-50 p-4 text-green-700 ring-1 ring-green-200">
                  <div className="flex">
                    <CheckCircle2 className="mr-3 h-5 w-5" />
                    <p>Ticket created successfully!</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 rounded-md bg-red-50 p-4 text-red-700 ring-1 ring-red-200">
                   <div className="flex">
                    <AlertCircle className="mr-3 h-5 w-5" />
                    <p>{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  id="title"
                  label="Title"
                  required
                  disabled={loading}
                  placeholder="Example: I can't access..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-50 focus:bg-white"
                />

                <Textarea
                  id="description"
                  label="Description"
                  required
                  rows={6}
                  disabled={loading}
                  placeholder="Explain what happened, the steps you tried, and if any error messages appeared."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  helperText="Tip: Include what you were doing before the mistake."
                  characterCount={description.length}
                  maxCharacters={4000}
                  className="bg-slate-50 focus:bg-white"
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Select
                    id="category"
                    label="Category"
                    disabled={loading}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: 'technical', label: 'Technical Issue' },
                      { value: 'billing', label: 'Billing' },
                      { value: 'feature', label: 'Feature Request' },
                      { value: 'other', label: 'Other' },
                    ]}
                    className="bg-slate-50 focus:bg-white"
                  />

                  <Select
                    id="priority"
                    label="Priority"
                    disabled={loading}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'critical', label: 'Critical' },
                    ]}
                    className="bg-slate-50 focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">Attachment</label>
                    <span className="text-xs text-slate-400">up to 5 files (up to 10 MB each)</span>
                  </div>
                  <div className="mt-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 transition-all hover:bg-slate-100">
                    <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:justify-start sm:text-left">
                      <Button variant="primary" type="button" className="mb-2 sm:mb-0 sm:mr-4">
                        Browse...
                      </Button>
                      <span className="text-sm text-slate-500">No files selected.</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      You can attach screenshots or PDFs to facilitate diagnosis.
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" isLoading={loading} className="w-full py-4 text-base shadow-md">
                    Send Ticket
                  </Button>
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Upon submission, your ticket will be created with an initial status of <span className="font-medium text-indigo-600">open</span>.
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h4 className="flex items-center text-base font-semibold text-slate-900">
                <AlertCircle className="mr-2 h-5 w-5 text-indigo-500" />
                Tips for faster resolution
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start"><span className="mr-2">•</span> Include a step-by-step description of what you did.</li>
                <li className="flex items-start"><span className="mr-2">•</span> If there was an error message, copy the exact text.</li>
                <li className="flex items-start"><span className="mr-2">•</span> Attach screenshots.</li>
                <li className="flex items-start"><span className="mr-2">•</span> Please specify your device and browser.</li>
              </ul>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h4 className="flex items-center text-base font-semibold text-slate-900">
                <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-500" />
                What happens next?
              </h4>
              <ol className="mt-4 space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">1</span>
                  <span><strong className="block font-medium text-slate-900">Screening:</strong> Your request is placed in a queue.</span>
                </li>
                <li className="flex gap-3">
                   <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">2</span>
                   <span><strong className="block font-medium text-slate-900">Response:</strong> An agent responds with guidance.</span>
                </li>
                <li className="flex gap-3">
                   <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">3</span>
                   <span><strong className="block font-medium text-slate-900">Resolution:</strong> Status changes to done.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
