import enBillsFilters from './BillsFilters/en-us'
import enBillSearchResultCard from './BillSearchResultCard/en-us'
import enBillOverviewCard from './BillDetailPage/BillOverviewCard/en-us'
import enBillSummaryCard from './BillSummaryCard/en-us'
import enBillSponsorsMapCard from './BillDetailPage/BillSponsorsMapCard/en-us'
import enBillVersionsCard from './BillDetailPage/BillVersionsCard/en-us'
import enBillActionsCard from './BillActionsCard/en-us'

import enMembersFilters from './MembersFilters/en-us'
import enMemberSearchResultCard from './MemberSearchResultCard/en-us'

import enSubscription from './Subscription/en-us'

const locale = {
  ...enBillsFilters,
  ...enBillSearchResultCard,
  ...enBillOverviewCard,
  ...enBillSummaryCard,
  ...enBillSponsorsMapCard,
  ...enBillVersionsCard,
  ...enBillActionsCard,
  ...enMembersFilters,
  ...enMemberSearchResultCard,
  ...enSubscription
}

export default locale
