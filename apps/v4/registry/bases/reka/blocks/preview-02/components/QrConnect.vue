<script setup lang="ts">
import { Button } from "@/registry/bases/reka/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/bases/reka/ui/card"
</script>

<template>
  <Card>
    <CardContent class="flex justify-center pt-6">
      <div class="rounded-xl border bg-white p-4">
        <!-- QR code placeholder - renders as a visual grid pattern -->
        <div class="size-40 bg-[repeating-linear-gradient(0deg,transparent,transparent_7px,#000_7px,#000_8px),repeating-linear-gradient(90deg,transparent,transparent_7px,#000_7px,#000_8px)] opacity-80" />
      </div>
    </CardContent>
    <CardHeader class="text-center">
      <CardTitle>Scan to connect your mobile device</CardTitle>
      <CardDescription>
        Open the Ledger mobile app and scan this code to link your device.
      </CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="secondary" class="w-full">
        Got it
      </Button>
    </CardFooter>
  </Card>
</template>
