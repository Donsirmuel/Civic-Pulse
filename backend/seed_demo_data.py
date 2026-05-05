"""
Demo data seeding script for CivicNet.
Run after first deploy to pre-populate data for testing/demo.

Usage:
    python manage.py shell
    >>> exec(open('seed_demo_data.py').read())
"""

from django.contrib.auth.models import User
from connectapp.models import Post, Issue, Official

# Create demo users
admin_user, _ = User.objects.get_or_create(
    username='admin',
    defaults={
        'email': 'admin@civicnet.ng',
        'is_staff': True,
        'is_superuser': True,
    }
)

citizen1, _ = User.objects.get_or_create(
    username='amina_okonjo',
    defaults={
        'email': 'amina.okonjo@civicnet.ng',
        'first_name': 'Amina',
        'last_name': 'Okonjo',
    }
)

citizen2, _ = User.objects.get_or_create(
    username='chisom_adeyemi',
    defaults={
        'email': 'chisom@civicnet.ng',
        'first_name': 'Chisom',
        'last_name': 'Adeyemi',
    }
)

official1, _ = User.objects.get_or_create(
    username='commissioner_works',
    defaults={
        'email': 'works@civicnet.gov.ng',
        'first_name': 'Adebayo',
        'last_name': 'Olusegun',
    }
)

# Create demo posts
posts_data = [
    {
        'author': citizen1,
        'title': 'Third Mainland Bridge needs urgent repairs',
        'body': 'The road surface has visible cracks and potholes. This is causing traffic accidents.',
        'category': 'infrastructure',
    },
    {
        'author': citizen2,
        'title': 'Pothole on Lekki-Epe Expressway',
        'body': 'Near Victoria Island junction. Dangerous for motorcyclists.',
        'category': 'infrastructure',
    },
    {
        'author': official1,
        'title': 'Lekki Toll Road Maintenance Update',
        'body': 'We are conducting routine maintenance this week. Expect light traffic delays.',
        'category': 'official_update',
    },
]

for post_data in posts_data:
    Post.objects.get_or_create(
        author=post_data['author'],
        title=post_data['title'],
        defaults={
            'body': post_data['body'],
            'category': post_data['category'],
        }
    )

print("✅ Demo data seeded successfully!")
print(f"   - Citizens: amina_okonjo, chisom_adeyemi")
print(f"   - Official: commissioner_works")
print(f"   - Posts: {len(posts_data)} demo posts created")
print(f"\n   Login with: username=admin, password=(your admin password)")
