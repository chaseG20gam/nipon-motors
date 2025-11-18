from __future__ import annotations

from pathlib import Path

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand, CommandError, call_command
from django.db import transaction

from nipon_cars.models import Car, Feature, Owner


class Command(BaseCommand):
    help = "Load curated demo data (features, cars, demo accounts) into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Delete existing catalog data before loading the fixtures.",
        )

    def handle(self, *args, **options):
        fixtures_root = Path(settings.BASE_DIR)
        cars_fixture = fixtures_root / "cars_data.json"

        if not cars_fixture.exists():
            raise CommandError(f"Fixture not found: {cars_fixture}")

        force_reload: bool = options.get("force", False)

        if Car.objects.exists() and not force_reload:
            self.stdout.write(
                self.style.WARNING(
                    "Sample car data already present. Skipping import. "
                    "Use --force to reload the curated dataset."
                )
            )
            self._ensure_demo_users()
            return

        # ensure authentication dependencies exist before loading fixtures with FK references
        self._ensure_demo_users()

        with transaction.atomic():
            if force_reload:
                self.stdout.write("Removing existing catalog entries...")
                Car.objects.all().delete()
                Owner.objects.all().delete()
                Feature.objects.all().delete()

            self.stdout.write(f"Loading fixture: {cars_fixture.name}...")
            call_command("loaddata", str(cars_fixture))

        self.stdout.write(self.style.SUCCESS("Sample data loaded successfully."))

    def _ensure_demo_users(self) -> None:
        User = get_user_model()

        demo_accounts = [
            {
                "username": "medjet",
                "email": "medjet@example.com",
                "is_staff": True,
                "is_superuser": True,
                "password": "medjet123",
            },
            {
                "username": "demo",
                "email": "demo@example.com",
                "is_staff": False,
                "is_superuser": False,
                "password": "demo123",
            },
        ]

        for account in demo_accounts:
            user, created = User.objects.update_or_create(
                username=account["username"],
                defaults={
                    "email": account["email"],
                    "is_staff": account["is_staff"],
                    "is_superuser": account["is_superuser"],
                    "is_active": True,
                },
            )
            user.set_password(account["password"])
            user.save(update_fields=["password", "email", "is_staff", "is_superuser", "is_active"])

            if created:
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Created demo account '{account['username']}' with password '{account['password']}'."
                    )
                )
            else:
                self.stdout.write(
                    f"Updated demo account '{account['username']}' (password reset)."
                )
