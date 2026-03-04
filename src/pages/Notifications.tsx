import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Trash2, Bell, Trophy, Flame, BookOpen, Sparkles, Info } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AppLayout from "@/components/AppLayout";
import { useNotifications, Notification } from "@/hooks/useNotifications";
import { useAuth } from "@/components/AuthContext";
import LoginBanner from "@/components/LoginBanner";

const iconMap: Record<string, React.ElementType> = {
  trophy: Trophy,
  flame: Flame,
  book: BookOpen,
  sparkles: Sparkles,
  info: Info
};

const typeColorMap: Record<string, string> = {
  welcome: "bg-accent/15 text-accent",
  progress: "bg-cta/15 text-cta",
  streak: "bg-vibe-blunt/15 text-vibe-blunt",
  lesson: "bg-primary/15 text-primary",
  level_up: "bg-accent/15 text-accent",
  info: "bg-muted text-muted-foreground"
};

const NotificationItem = ({
  notification,
  onRead,
  onDelete,
  onNavigate





}: {notification: Notification;onRead: (id: string) => void;onDelete: (id: string) => void;onNavigate: (link: string) => void;}) => {
  const Icon = iconMap[notification.icon] || Info;
  const colorClass = typeColorMap[notification.type] || typeColorMap.info;

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 transition-colors cursor-pointer hover:bg-secondary/50 ${
      !notification.is_read ? "bg-accent/5" : ""}`
      }
      onClick={() => {
        if (!notification.is_read) onRead(notification.id);
        if (notification.link) onNavigate(notification.link);
      }}>
      
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="w-4.5 h-4.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`text-base font-medium truncate ${!notification.is_read ? "text-foreground" : "text-muted-foreground"}`}>
            
            {notification.title}
          </p>
          {!notification.is_read && <span className="w-2 h-2 rounded-full bg-accent shrink-0" />}
        </div>
        <p className="text-muted-foreground mt-0.5 line-clamp-2 text-sm">{notification.message}</p>
        <p className="text-muted-foreground/60 mt-1 text-sm">
          {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification.id);
        }}
        className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0">
        
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>);

};

const Notifications = () => {
  const navigate = useNavigate();
  const { isGuest, user } = useAuth();
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const showBanner = isGuest || !user;

  return (
    <AppLayout>
      <header className="flex items-center gap-3 px-5 pt-6 pb-4 md:max-w-[900px] md:mx-auto md:w-full">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold flex-1">Notifications</h1>
        {unreadCount > 0 &&
        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors">
          
            <Check className="w-3.5 h-3.5" />
            Mark all read
          </button>
        }
      </header>

      <main className="px-5 pb-8 md:max-w-[900px] md:mx-auto md:w-full relative">
        {showBanner && <LoginBanner className="-top-2 mb-4" />}

        {loading ?
        <div className="space-y-3">
            {[1, 2, 3].map((i) =>
          <div key={i} className="bg-card rounded-2xl h-20 animate-pulse" />
          )}
          </div> :
        notifications.length === 0 ?
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="w-7 h-7 text-muted-foreground" />
            </div>
            <h2 className="text-base font-semibold text-foreground">No notifications yet</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">
              Complete lessons and hit milestones to receive updates here.
            </p>
          </div> :

        <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
            {notifications.map((n) =>
          <NotificationItem
            key={n.id}
            notification={n}
            onRead={markAsRead}
            onDelete={deleteNotification}
            onNavigate={(link) => navigate(link)} />

          )}
          </div>
        }
      </main>
    </AppLayout>);

};

export default Notifications;