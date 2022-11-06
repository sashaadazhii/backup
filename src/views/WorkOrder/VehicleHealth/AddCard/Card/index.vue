<template>
    <div class="card__wrapper">
        <div class="card__icon">
            <i class="i-add_circle" @click="addNewCard"/>
        </div>
        <Label :label="cardRelation" size="small" circle class="card__Label -grey"/>
        <div class="card__name">{{ card.name }}</div>
        <Label :label="cardWarranty" size="small" class="card__Label -border"/>
    </div>
</template>

<script>
import Label from '@/components/Yaro/Label'

import {mapState, mapMutations} from 'vuex'

export default {
    name: 'Card',
    components: {Label},
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    data() {
        return {}
    },
    created() {
    },
    computed: {
        ...mapState({}),
        cardRelation() {
            if (this.card.cardRelationType === 'global') return 'Global'
            const {make, model, yearFrom, yearTo} = this.card.relation
            const relation = `${make} ${model} ${yearFrom} ${yearFrom === yearTo ? '' : '- ' + yearTo}`
            return relation
        },
        cardWarranty() {
            const {odometerTrack, timeTrackLength} = this.card
            return odometerTrack ?
                `${odometerTrack.toLocaleString('fr-FR')} KM / ${timeTrackLength.toLocaleString('fr-FR')} Months` : ''
        },
        formattedCard() {
            return {
                ...this.card,
                additional: null,
                advisorApprove: false,
                approvalStatus: "No Status",
                archive: null,
                customPrice: null,
                displayFees: false,
                displayLabour: false,
                id: Math.floor(Math.random() * 100000),
                odometerTrack: +this.card.odometerTrack,
                partsForCustomer: null,
                relation: {},
                select: false,
                service: Math.floor(Math.random() * 100),
                status: "No Status",
                time: new Date().toLocaleTimeString(),
                timeTrackLength: +this.card.timeTrackLength,

            }
        },
    },
    methods: {
        ...mapMutations({
            // selectAll: 'company/cards/selectAll',
            addCard: 'company/cards/addCard',
        }),
        addNewCard() {
            this.addCard(this.formattedCard)
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
