'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Ticket, CheckCircle2, AlertCircle } from 'lucide-react';
import logoImg from '../../assets/logo-name-support-desk.png';
import { createTicketMock } from '../../mocks/tickets';

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
      // Reset form
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
      {/* Top Navigation / Logo Area */}
      <header className="px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="inline-block">
            <Image
              src={logoImg}
              alt="SupportDesk Pro"
              width={200}
              className="object-contain"
            />
          </Link>
        </div>
      </header>

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
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    disabled={loading}
                    className="mt-2 block w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all disabled:opacity-60"
                    placeholder="Example: I can't access..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 relative">
                    <textarea
                      id="description"
                      rows={6}
                      required
                      disabled={loading}
                      className="block w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all disabled:opacity-60"
                      placeholder="Explain what happened, the steps you tried, and if any error messages appeared."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="mt-2 flex justify-between text-xs text-slate-400">
                      <span>Tip: Include what you were doing before the mistake.</span>
                      <span>{description.length}/4000</span>
                    </div>
                  </div>
                </div>

                {/* Category & Priority */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700">
                      Category
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="category"
                        disabled={loading}
                        className="block w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all disabled:opacity-60"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="" disabled>Select...</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700">
                      Priority
                    </label>
                    <div className="relative mt-2">
                      <select
                        id="priority"
                        disabled={loading}
                        className="block w-full appearance-none rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all disabled:opacity-60"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="" disabled>Select...</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attachment */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700">Attachment</label>
                    <span className="text-xs text-slate-400">up to 5 files (up to 10 MB each)</span>
                  </div>
                  <div className="mt-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 transition-all hover:bg-slate-100">
                    <div className="flex flex-col items-center justify-center text-center sm:flex-row sm:justify-start sm:text-left">
                      <button
                        type="button"
                        className="mb-2 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mb-0 sm:mr-4"
                      >
                        Browse...
                      </button>
                      <span className="text-sm text-slate-500">No files selected.</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">
                      You can attach screenshots or PDFs to facilitate diagnosis.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Ticket'}
                  </button>
                  <p className="mt-4 text-center text-xs text-slate-500">
                    Upon submission, your ticket will be created with an initial status of <span className="font-medium text-indigo-600">open</span>.
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Tips Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h4 className="flex items-center text-base font-semibold text-slate-900">
                <AlertCircle className="mr-2 h-5 w-5 text-indigo-500" />
                Tips for faster resolution
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Include a step-by-step description of what you did.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  If there was an error message, copy the exact text.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Attach screenshots.
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Please specify your device and browser (e.g., Chrome on your mobile phone).
                </li>
              </ul>
            </div>

            {/* What Happens Next Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
              <h4 className="flex items-center text-base font-semibold text-slate-900">
                <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-500" />
                What happens next?
              </h4>
              <ol className="mt-4 space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">1</span>
                  <span>
                    <strong className="block font-medium text-slate-900">Screening:</strong> 
                    Your request is placed in a queue and reviewed by the team.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">2</span>
                  <span>
                    <strong className="block font-medium text-slate-900">Response:</strong> 
                    An agent responds with guidance or requests more details.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">3</span>
                  <span>
                    <strong className="block font-medium text-slate-900">Resolution:</strong> 
                    When resolved, the status changes to done.
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}