from django.contrib import admin
from .models import UserProfile, Issue, Post, Comment, Message, Notification, BookmarkedItem

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'is_verified', 'created_at']
    list_filter = ['role', 'is_verified', 'created_at']
    search_fields = ['user__username', 'location']

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'priority', 'created_by', 'assigned_to', 'created_at']
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['title', 'description', 'state']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['author', 'likes', 'comments', 'is_pinned', 'created_at']
    list_filter = ['is_pinned', 'created_at']
    search_fields = ['content', 'author__username']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['author', 'post', 'issue', 'likes', 'created_at']
    list_filter = ['created_at']
    search_fields = ['content', 'author__username']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'is_read', 'created_at']
    list_filter = ['is_read', 'created_at']
    search_fields = ['sender__username', 'receiver__username', 'content']
    readonly_fields = ['created_at']

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'notification_type', 'is_read', 'created_at']
    list_filter = ['notification_type', 'is_read', 'created_at']
    search_fields = ['user__username', 'title', 'message']
    readonly_fields = ['created_at']

@admin.register(BookmarkedItem)
class BookmarkedItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'item_type', 'created_at']
    list_filter = ['item_type', 'created_at']
    search_fields = ['user__username']
    readonly_fields = ['created_at']

