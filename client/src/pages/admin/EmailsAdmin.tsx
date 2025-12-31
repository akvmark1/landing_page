import { useEffect, useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Loader2, Trash2, Mail, CheckCircle, Clock, RefreshCw, Download } from 'lucide-react';
import { getNotifyEmails, deleteNotifyEmail, markEmailAsNotified, NotifyEmail } from '../../lib/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';

export function EmailsAdmin() {
  const [emails, setEmails] = useState<NotifyEmail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const data = await getNotifyEmails();
    setEmails(data);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this email?')) return;
    
    const result = await deleteNotifyEmail(id);
    if (result.success) {
      toast.success('Email deleted!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to delete email');
    }
  };

  const handleMarkAsNotified = async (id: string) => {
    const result = await markEmailAsNotified(id);
    if (result.success) {
      toast.success('Marked as notified!');
      fetchData();
    } else {
      toast.error(result.error || 'Failed to mark as notified');
    }
  };

  const handleBulkMarkNotified = async () => {
    if (selectedEmails.size === 0) return;
    
    const promises = Array.from(selectedEmails).map(id => markEmailAsNotified(id));
    await Promise.all(promises);
    toast.success(`${selectedEmails.size} emails marked as notified!`);
    setSelectedEmails(new Set());
    fetchData();
  };

  const handleBulkDelete = async () => {
    if (selectedEmails.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedEmails.size} emails?`)) return;
    
    const promises = Array.from(selectedEmails).map(id => deleteNotifyEmail(id));
    await Promise.all(promises);
    toast.success(`${selectedEmails.size} emails deleted!`);
    setSelectedEmails(new Set());
    fetchData();
  };

  const handleSelectAll = () => {
    if (selectedEmails.size === emails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(emails.map(e => e.id)));
    }
  };

  const handleExportCSV = () => {
    const headers = ['Email', 'Subscribed Date', 'Status', 'Notified Date'];
    const rows = emails.map(email => [
      email.email,
      format(new Date(email.created_at), 'yyyy-MM-dd HH:mm'),
      email.is_notified ? 'Notified' : 'Pending',
      email.notified_at ? format(new Date(email.notified_at), 'yyyy-MM-dd HH:mm') : ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `notify-emails-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Emails exported to CSV!');
  };

  const pendingCount = emails.filter(e => !e.is_notified).length;
  const notifiedCount = emails.filter(e => e.is_notified).length;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Notify Emails</h1>
            <p className="text-slate-400 mt-1">Manage email subscriptions from the Coming Soon page</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={handleExportCSV}
              disabled={emails.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{emails.length}</p>
                <p className="text-slate-400 text-sm">Total Subscribers</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{pendingCount}</p>
                <p className="text-slate-400 text-sm">Pending Notification</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{notifiedCount}</p>
                <p className="text-slate-400 text-sm">Already Notified</p>
              </div>
            </div>
          </div>
        </div>

        {selectedEmails.size > 0 && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 flex items-center justify-between">
            <span className="text-cyan-400">{selectedEmails.size} email(s) selected</span>
            <div className="flex gap-3">
              <button
                onClick={handleBulkMarkNotified}
                className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Notified
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left p-4">
                    <input
                      type="checkbox"
                      checked={selectedEmails.size === emails.length && emails.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                    />
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Email</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Subscribed</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left p-4 text-sm font-medium text-slate-400">Notified At</th>
                  <th className="text-right p-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emails.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400">
                      No email subscriptions yet
                    </td>
                  </tr>
                ) : (
                  emails.map((email) => (
                    <tr key={email.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedEmails.has(email.id)}
                          onChange={(e) => {
                            const newSelected = new Set(selectedEmails);
                            if (e.target.checked) {
                              newSelected.add(email.id);
                            } else {
                              newSelected.delete(email.id);
                            }
                            setSelectedEmails(newSelected);
                          }}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-700"
                        />
                      </td>
                      <td className="p-4">
                        <span className="text-white">{email.email}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-400 text-sm">
                          {format(new Date(email.created_at), 'MMM d, yyyy h:mm a')}
                        </span>
                      </td>
                      <td className="p-4">
                        {email.is_notified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                            <CheckCircle className="w-3 h-3" />
                            Notified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-slate-400 text-sm">
                          {email.notified_at 
                            ? format(new Date(email.notified_at), 'MMM d, yyyy h:mm a')
                            : '-'
                          }
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {!email.is_notified && (
                            <button
                              onClick={() => handleMarkAsNotified(email.id)}
                              className="p-2 text-slate-400 hover:text-green-400 transition-colors"
                              title="Mark as Notified"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(email.id)}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
