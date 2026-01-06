'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Ticket, Plus, Search, Filter, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getTicketsMock, TicketData } from '../mocks/tickets';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Header } from '../components/layout/Header';

export default function TicketListPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTicketsMock();
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open': return <Badge variant="info">Open</Badge>;
      case 'in_progress': return <Badge variant="warning">In Progress</Badge>;
      case 'closed': return <Badge variant="neutral">Closed</Badge>;
      default: return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default:
        return <Ticket className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#eef2ff] pb-12 font-sans text-slate-900">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 shadow-sm">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Support Desk PRO</h1>
              <h2 className="text-2xl font-bold text-slate-900">My Tickets</h2>
            </div>
          </div>
          <Link href="/open-ticket">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Ticket
            </Button>
          </Link>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm flex-1">
            <Input 
              placeholder="Search tickets..."
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4 text-slate-500" />
            Filter
          </Button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50">
          {loading ? (
             <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
             </div>
          ) : tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-slate-50 p-4">
                <Ticket className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-900">No tickets found</h3>
              <p className="mt-1 text-slate-500">You haven&apos;t created any tickets yet.</p>
              <div className="mt-6">
                <Link href="/open-ticket">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Ticket
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Priority</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {tickets.map((ticket) => (
                    <tr 
                      key={ticket.id} 
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => router.push(`/tickets/${ticket.id}`)}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">#{ticket.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-slate-900">{ticket.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">{ticket.description}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500 capitalize">{ticket.category}</td>
                      <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(ticket.status)}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                         <div className="flex items-center gap-2">
                            {getPriorityIcon(ticket.priority)}
                            <span className="text-sm text-slate-600 capitalize">{ticket.priority}</span>
                         </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                           <Clock className="h-3.5 w-3.5" />
                           {new Date(ticket.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
