import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ExitIco from '../../assets/icons/Exit';

export default function TermsOfConditions(props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        style={{position: 'absolute', top: 40, right: 40, zIndex: 99999}}
        onPress={() => props.navigation.goBack()}>
        <ExitIco width={30} height={30} color={"#E09682"}/>
      </TouchableOpacity>
      <View style={styles.termsWrapper}>
        <Text style={styles.title}>SET ME UP TERMS AND CONDITIONS</Text>
        <Text style={styles.text}>
          I, understand, acknowledge and agree that I have voluntarily agreed to
          participate in and be enrolled in a test application of the Set Me Up
          experience (the “Experience”) owned and administered by My Friend Set
          Me Up, LLC (“Company”). I acknowledge that my enrollment and
          subsequent participation is purely voluntary and in no way mandated by
          anyone. I further acknowledge, understand and agree that my
          participation in the Experience inherently includes my assumption of
          and acceptance of certain inherent risks, conditions and terms. As
          such, by my signing this Waiver and Release, I hereby acknowledge,
          understand and agree to the following:
        </Text>
        <Text style={[styles.text, styles.space]}>
          1. I represent and warrant that any and all personal information I
          provide to the Company in connection with my participation in the
          Experience is true, correct and accurate, including but not limited to
          the following: (a) I am at least 18 years old; (b) I am single or
          legally separated from my spouse; (c) I am not prohibited by any
          local, state or federal law or regulation from my participation in the
          Experience; (d) I have not been convicted of or pled no contest to a
          felony or indictable offense (or crime of similar severity), a sex
          crime, or any crime involving violence; and (e) I am not now
          registered or required to be registered as a sex offender with any
          state, federal or local sex offender registry.
        </Text>
        <Text style={[styles.text, styles.space]}>
          2. I represent and warrant that I will not use my participation in the
          Experience for any harmful, illegal and/or unlawful purpose, nor will
          I use my participation for any commercial purpose. I further represent
          and warrant that I will not harass, bully, stalk, intimidate, assault,
          defame, harm or otherwise mistreat any person in connection with my
          participation in the Experience.
        </Text>
        <Text style={[styles.text, styles.space]}>
          3. I represent and warrant that I will not copy, duplicate, modify,
          transmit, distribute, or create any derivative works from, any
          information I receive in connection with my participation in the
          Experience. In this regard, I understand, acknowledge and agree that
          all content, materials, images, trademarks, trade names, service
          marks, or other intellectual property, content or proprietary
          information in connection with my participation in the Experience is
          solely owned by the Company and may not be used, copied or duplicated
          without the Company’s prior written consent. I understand and agree
          that neither I, nor the Company, will share or duplicate any
          information provided by me or to me (by either the Company or another
          participant in the Experience) in connection with the Experience,
          except as provided herein, without the prior, written consent of
          myself, the Company or any other affected third-party.
        </Text>
        <Text style={[styles.text, styles.space]}>
          4. I understand, acknowledge and agree that the Company does not and
          has not conducted any criminal background or identity verification
          checks on any of the participants in connection with the Experience.
          The Company makes no representations or warranties as to the conduct,
          identity, intentions, legitimacy or veracity of any participant in the
          Experience. Notwithstanding the foregoing, the Company reserves the
          right to conduct such criminal background checks or other screenings
          at any time and in the Company’s sole discretion. Therefore, I agree
          that any I provide in connection with the Experience may be used for
          that purpose.
        </Text>
        <Text style={[styles.text, styles.space]}>
          5. I agree to use my best judgment when interacting with others and to
          follow all safety guidelines. understand, acknowledge and agree that
          sex offender screenings, criminal background checks and other tools do
          not guarantee my safety and are not a substitute for following safety
          guidelines and sensible safety precautions. I will always use my best
          judgment and take appropriate safety precautions when communicating
          with or meeting new people.{' '}
        </Text>
        <Text style={[styles.text, styles.space]}>
          6.I understand, acknowledge and agree that my participation in the
          Experience does not guarantee or insure my ability or approval by the
          Company to participate in any future tests of the Experience.
          Likewise, my participation in the Experience does not guarantee or
          insure of such ability or approval to participate in any final,
          commercial version of the Experience, irrespective of the particular
          format of such. I understand, acknowledge and agree that should I
          choose to participate in any final, commercial version of the
          Experience, I will be required to complete and agree to all terms and
          conditions implemented by the Company in connection with such final
          version, including but not limited to, completing a truthful and
          accurate registration and application for participation therein.{' '}
        </Text>
        <Text style={[styles.text, styles.space]}>
          7. I affirm that I am in good physical condition and do not suffer
          from any known mental and/or physical disability or condition which
          would prevent or limit my participation in the Experience.{' '}
        </Text>
        <Text style={[styles.text, styles.space]}>
          8. I further affirm and recognize that my participation in the
          Experience will include interaction and activities with other
          individuals that are likely to increase the risk of exposure to
          communicable diseases, including, but not limited to, COVID-19,
          (hereinafter, “Diseases”), which may increase the likelihood of my
          contracting such Diseases. I understand, acknowledge and agree that
          this exposure is possible through direct contact with other people,
          proximity to other people, and contact with surfaces that other people
          have had contact with. By participating in the Experience, I represent
          that I do not have any symptoms of such Diseases and that I have not
          been diagnosed with such Diseases. By participating in the Experience,
          I represent that I have been informed of these risks and voluntarily
          assume the risks of potential infection of the Diseases. I also
          understand that there is the possibility that I may transmit the
          Diseases to others, even if I did not show symptoms of thereof.{' '}
        </Text>
        <Text style={[styles.text, styles.space]}>
          9. I understand, acknowledge and agree that the Company makes no
          representations and/or warranties regarding any aspect of my
          participation in the Experience or as to any expectation of any
          particular results from my participation in the Experience.
        </Text>
        <Text style={[styles.text, styles.space]}>
          10. I hereby release and agree to hold harmless, the Company and each
          of its respective affiliates, agents, owners, members, series,
          employees, successors and assigns from any claims, demands, causes of
          actions, damages, and injuries as a result of my participation and
          enrollment in the Experience. I further understand, acknowledge and
          agree that the Company takes no responsibility for the acts and/or
          conduct of any other participant in the Experience. I expressly
          understand, acknowledge and agree that this release is intended to be
          as broad and inclusive as permitted by applicable law and if a portion
          of this release is held invalid, the balance shall remain in full
          force and effect. In this regard, I understand, acknowledge and agree
          that under no circumstances will the Company be liable for any
          indirect, consequential, exemplary, incidental, special or punitive
          damages, whether incurred directly or indirectly, from my
          participation in the Experience. This release shall apply to my heirs,
          assigns, personal representatives and any other next of kin. I
          understand that the Company is relying on this release in agreeing to
          allow my participation in the Experience.{' '}
        </Text>
        <Text style={[styles.text, styles.space]}>
          11. I agree to indemnify the Company if a claim is made against the
          Company due to my actions and/or conduct in connection with the
          Experience. I agree, to the extent permitted under applicable law, to
          indemnify, defend, and hold harmless the Company, our affiliates, and
          their and our respective officers, directors, agents, and employees
          from and against any and all complaints, demands, claims, damages,
          losses, costs, liabilities, and expenses, including attorney’s fees,
          due to, arising out of, or relating in any way to my participation in
          the Experience.
        </Text>
        <Text style={[styles.text, styles.space]}>
          12. I understand, acknowledge and agree that this Waiver and Release
          and all proceedings hereunder are governed by the laws of the State of
          Alabama. I agree that any proceeding brought hereunder must be brought
          in Jefferson County, State of Alabama.
        </Text>
        <Text style={[styles.text, styles.space]}>
          I HAVE READ, UNDERSTAND AND AGREE TO THE FOREGOING RELEASE AND WAIVER,
          INCLUDING ALL TERMS AND CONDITIONS. I FURTHER ACKNOWLEDGE, UNDERSTAND
          AND AGREE THAT I HAVE GIVEN UP SUBSTANTIAL RIGHTS BY SIGNING THIS
          RELEASE AND WAIVER AND THAT I SIGN IT FREELY AND VOLUNTARILY WITHOUT
          ANY INDUCEMENT.
        </Text>
      </View>
    </ScrollView>
  );
}

let styles = StyleSheet.create({
  termsWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 85,
    padding: 45,
  },
  text: {
    fontSize: RFValue(10, 812),
    fontFamily: 'AzoSans',
    color: '#707070',
    lineHeight: 12,
  },
  space: {
    marginTop: 10,
  },
  title: {
    fontSize: RFValue(16, 812),
    marginBottom: 20,
    fontFamily: 'AzoSansBold',
    color: '#707070',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
