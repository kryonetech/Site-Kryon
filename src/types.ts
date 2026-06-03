/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Solution {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Plan {
  id: string;
  name: string;
  highlightText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  popular?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  needs: string[];
  message: string;
}
