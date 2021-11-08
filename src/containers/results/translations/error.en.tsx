/*
   Copyright 2021 Queen’s Printer for Ontario

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import React, {FC} from 'react';
import {Linking} from 'react-native';
import {Button} from 'components/core/button';
import {TitleText, P, UL, LI, LinkText, B} from 'containers/results/styles';
import openURL from 'utils/openURL';
import useTelLink from 'utils/useTelLink';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const ErrorEn: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');
  return (
    <>
      <TitleText>This certificate can not be used to enter.</TitleText>
      <P>What to do next:</P>
      <UL>
        <LI>
          let the visitor know this certificate <B>can not</B> be accepted for
          entry
        </LI>
        <LI>
          the QR code may indicate <B>the visitor has only one vaccination</B>
        </LI>
        <LI>
          <B>14 days</B> may have <B>not passed</B> since the visitor got their
          second dose
        </LI>
        <LI>
          let the visitor know that if they have had a second dose and 14 days
          have passed, they should <B>download their most recent</B> enhanced
          vaccine certificate with official QR code
        </LI>
        <LI>
          redirect a visitor to{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/verify-results',
                true,
                'ontario.ca/verify-results',
              );
            }}>
            ontario.ca/verify-results
          </LinkText>{' '}
          for result details and tell them they can call for extra help{' '}
          {telLink ? (
            <LinkText
              onPress={() => {
                trackLogEvent(verifyEvent.LINK_CLICK, {
                  outbound: true,
                  link_url: 'phone',
                  link_text: '1-833-943-3900',
                });
                Linking.openURL(telLink);
              }}>
              1-833-943-3900
            </LinkText>
          ) : (
            '1-833-943-3900'
          )}
        </LI>
      </UL>
      {screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() =>
            openURL(
              'https://www.ontario.ca/verify-results',
              true,
              'Visit ontario.ca/verify-results',
            )
          }>
          Visit ontario.ca/verify-results
        </Button>
      )}
      {telLink && screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() => {
            trackLogEvent(verifyEvent.LINK_CLICK, {
              outbound: true,
              link_url: 'phone',
              link_text: 'Call 1-833-943-3900',
            });
            Linking.openURL(telLink);
          }}>
          Call 1-833-943-3900
        </Button>
      )}
    </>
  );
};
export default ErrorEn;
