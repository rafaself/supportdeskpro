'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  MessageSquare,
  User,
  Paperclip
} from 'lucide-react';
import logoImg from '../../../assets/logo-name-support-desk.png';
import paymentFailedImg from '../../../assets/payment-failed.png';
import { getTicketsMock, TicketData, replyTicketMock, ActivityData } from '../../../mocks/tickets';

export default function TicketDetailsPage() {
  const params = useParams();
  const ticketId = params.id as string;
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Reply State
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);
  
  const [activities, setActivities] = useState<ActivityData[]>([]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await getTicketsMock();
        // Simulate finding the specific ticket or default to the first one for demo
        const foundTicket = response.data.find(t => t.id === ticketId) || response.data[0];
        setTicket(foundTicket);
        
        // Initialize with a system message
        setActivities([
          {
            id: 'system-1',
            type: 'system',
            content: 'Ticket created successfully. Our team has been notified.',
            createdAt: foundTicket.createdAt,
          }
        ]);
      } catch (error) {
        console.error('Failed to fetch ticket', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const handleReply = async () => {
    // Validation
    if (!replyText.trim()) {
      setReplyError('Please enter a message to reply.');
      return;
    }
    
    setReplyError(null);
    setIsReplying(true);

    try {
      const response = await replyTicketMock(ticketId, replyText);
      setActivities([...activities, response.data]);
      setReplyText('');
    } catch (error) {
      console.error('Failed to send reply', error);
      setReplyError('Failed to send reply. Please try again.');
    } finally {
      setIsReplying(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
            Open
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            In Progress
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
     return (
        <div className="flex min-h-screen items-center justify-center bg-[#eef2ff]">
           <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
     );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#eef2ff] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900">Ticket not found</h2>
          <Link href="/" className="mt-4 inline-block text-indigo-600 hover:underline">
            Back to tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eef2ff] pb-12 font-sans text-slate-900">
      {/* Top Navigation */}
      <header className="px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="inline-block">
            <Image
              src={logoImg}
              alt="SupportDesk Pro"
              width={200}
              className="object-contain"
            />
          </Link>
          <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Tickets
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content: Ticket Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-slate-400">#{ticket.id}</span>
                      {getStatusBadge(ticket.status)}
                   </div>
                   <h1 className="text-2xl font-bold text-slate-900">{ticket.title}</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                   <Clock className="h-4 w-4" />
                   {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">Description</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {ticket.description}
                </p>
                {/* Mock extended description content for demo */}
                <p className="mt-4 text-slate-600 leading-relaxed">
                  I was trying to process a payment for the premium plan subscription. 
                  After entering my credit card details and clicking "Submit", the page loaded for about 30 seconds and then showed a generic error message.
                  I tried refreshin the page and clearing my cache, but the issue persists.
                </p>
              </div>

              {/* Attachment Section */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                   <Paperclip className="h-4 w-4" />
                   Attachments (1)
                </h3>
                <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-indigo-200 hover:shadow-md">
                   <div className="aspect-video w-full relative bg-slate-200 overflow-hidden">
                      <Image 
                        src={paymentFailedImg}
                        alt="Payment Failed Attachment"
                        fill
                        className="object-cover"
                      />
                   </div>
                   <div className="flex items-center justify-between p-4 bg-white">
                      <div>
                         <p className="font-medium text-slate-900 text-sm">payment-failed.png</p>
                         <p className="text-xs text-slate-500">245 KB • PNG Image</p>
                      </div>
                      <button className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-indigo-600 transition-colors">
                         <Download className="h-5 w-5" />
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* Conversation / Activity Feed */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50 sm:p-8">
               <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-indigo-600" />
                  Activity
               </h3>
               
               <div className="space-y-8">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                       <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center border ${activity.type === 'system' ? 'bg-indigo-50 border-indigo-100' : 'bg-indigo-100 border-indigo-200 text-indigo-600 font-bold text-xs'}`}>
                          {activity.type === 'system' ? <CheckCircle2 className="h-5 w-5 text-indigo-600" /> : activity.author}
                       </div>
                       <div className="flex-1">
                          <div className={`rounded-lg p-4 border ${activity.type === 'system' ? 'bg-slate-50 border-slate-100 rounded-tl-none' : 'bg-white border-slate-200 rounded-tl-none shadow-sm'}`}>
                             <p className="text-sm text-slate-600">
                                {activity.content}
                             </p>
                          </div>
                          <span className="text-xs text-slate-400 mt-1 block pl-1">
                             {new Date(activity.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                       </div>
                    </div>
                  ))}
               </div>

               {/* Reply Box */}
               <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex gap-4">
                     <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                        JD
                     </div>
                     <div className="flex-1">
                        <textarea 
                           className={`w-full rounded-lg border bg-white p-3 text-sm focus:outline-none focus:ring-4 transition-all ${replyError ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10'}`}
                           rows={3}
                           placeholder="Type a reply..."
                           value={replyText}
                           onChange={(e) => {
                             setReplyText(e.target.value);
                             if (replyError) setReplyError(null);
                           }}
                           disabled={isReplying}
                        ></textarea>
                        
                        {replyError && (
                          <p className="mt-2 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1.5" />
                            {replyError}
                          </p>
                        )}

                        <div className="mt-2 flex justify-end">
                           <button 
                             onClick={handleReply}
                             disabled={isReplying}
                             className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                           >
                              {isReplying ? 'Sending...' : 'Reply'}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column: Meta Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
               <h3 className="font-semibold text-slate-900 mb-4">Ticket Info</h3>
               
               <div className="space-y-4">
                  <div>
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">Priority</span>
                     <div className="flex items-center gap-2">
                        {ticket.priority === 'high' || ticket.priority === 'critical' ? (
                           <AlertCircle className="h-4 w-4 text-red-500" />
                        ) : (
                           <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span className="text-sm font-medium text-slate-900 capitalize">{ticket.priority}</span>
                     </div>
                  </div>

                  <div>
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">Category</span>
                     <span className="text-sm font-medium text-slate-900 capitalize">{ticket.category}</span>
                  </div>

                  <div>
                     <span className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1">Assigned Agent</span>
                     <div className="flex items-center gap-2 mt-1">
                        <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center">
                           <User className="h-3 w-3 text-slate-500" />
                        </div>
                        <span className="text-sm text-slate-600 italic">Unassigned</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}